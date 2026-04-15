import { NextRequest, NextResponse } from 'next/server';
import { getLeads, upsertLead } from '@/lib/comms/store';
import type { LeadRecord } from '@/lib/comms/types';

export const dynamic = 'force-dynamic';

/**
 * Lead Management API
 * 
 * Handles lead storage, retrieval, and qualification tracking
 */

function generateLeadId() {
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

function getTenantId(lead: Record<string, unknown>) {
  if (typeof lead.tenantId === 'string' && lead.tenantId) {
    return lead.tenantId;
  }
  if (typeof lead.persona === 'string' && lead.persona) {
    return `tenant_${lead.persona.toLowerCase()}`;
  }
  return 'tenant_need';
}

export async function POST(request: NextRequest) {
  try {
    const lead = await request.json();

    // Validate required fields
    if (!lead.phoneNumber || !lead.persona) {
      return NextResponse.json(
        { error: 'Missing required fields: phoneNumber, persona' },
        { status: 400 }
      );
    }

    // Create lead record
    const leadRecord: LeadRecord = {
      id: generateLeadId(),
      phoneNumber: lead.phoneNumber,
      callerNumber: lead.callerNumber,
      persona: lead.persona,
      tenantId: getTenantId(lead),
      status: lead.status || 'new',
      qualification: lead.qualification || 'pending',
      metadata: lead.metadata || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    upsertLead(leadRecord);

    console.log(`[Leads API] Created lead: ${leadRecord.id}, persona: ${leadRecord.persona}`);

    return NextResponse.json({
      success: true,
      lead: leadRecord
    }, { status: 201 });
  } catch (error) {
    console.error('[Leads API] Error creating lead:', error);
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const number = searchParams.get('number');
    const status = searchParams.get('status');
    const persona = searchParams.get('persona');
    const limit = parseInt(searchParams.get('limit') || '100');

    const allLeads = getLeads();
    let filteredLeads = [...allLeads];

    // Apply filters
    if (number) {
      filteredLeads = filteredLeads.filter(lead => 
        lead.phoneNumber === number || lead.callerNumber === number
      );
    }

    if (status) {
      filteredLeads = filteredLeads.filter(lead => lead.status === status);
    }

    if (persona) {
      filteredLeads = filteredLeads.filter(lead => lead.persona === persona);
    }

    // Sort by most recent first
    filteredLeads.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Apply limit
    const results = filteredLeads.slice(0, limit);

    return NextResponse.json({
      success: true,
      count: results.length,
      total: allLeads.length,
      leads: results
    });
  } catch (error) {
    console.error('[Leads API] Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Missing required field: id' },
        { status: 400 }
      );
    }

    const leads = getLeads();
    const existingLead = leads.find(lead => lead.id === id);

    if (!existingLead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Update lead
    const updatedLead: LeadRecord = {
      ...existingLead,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    upsertLead(updatedLead);

    console.log(`[Leads API] Updated lead: ${id}`);

    return NextResponse.json({
      success: true,
      lead: updatedLead
    });
  } catch (error) {
    console.error('[Leads API] Error updating lead:', error);
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    );
  }
}
