// Telnyx API type definitions and wrappers

export interface TelnyxConnection {
  id: string;
  connection_name: string;
  webhook_event_url?: string;
  active: boolean;
  // Add other fields as needed
}

export interface TelnyxAssistant {
  id: string;
  name: string;
  model: string;
  instructions: string;
  // Add other fields
}

export interface TelnyxPhoneNumber {
  phone_number: string;
  connection_id?: string;
  messaging_profile_id?: string;
  // Add other fields
}

export interface TelnyxMessagingProfile {
  id: string;
  name: string;
  // Add other fields
}

// Wrapper functions with proper typing
export class TelnyxWrapper {
  private client: any;

  constructor(apiKey: string) {
    // Import Telnyx dynamically to avoid build issues
    const Telnyx = require('telnyx');
    this.client = new Telnyx({ apiKey });
  }

  async createConnection(name: string, webhookUrl?: string): Promise<TelnyxConnection> {
    try {
      // Adjust based on actual SDK API
      const connection = await this.client.connections.create({
        connection_name: name,
        webhook_event_url: webhookUrl,
        active: true,
      });
      return connection;
    } catch (error) {
      console.error('Error creating connection:', error);
      throw error;
    }
  }

  async listConnections(): Promise<TelnyxConnection[]> {
    try {
      const response = await this.client.connections.list();
      return response.data || response;
    } catch (error) {
      console.error('Error listing connections:', error);
      throw error;
    }
  }

  async updateConnection(id: string, updates: Partial<TelnyxConnection>): Promise<TelnyxConnection> {
    try {
      const connection = await this.client.connections.update(id, updates);
      return connection;
    } catch (error) {
      console.error('Error updating connection:', error);
      throw error;
    }
  }

  async createAssistant(name: string, model: string, instructions: string): Promise<TelnyxAssistant> {
    try {
      const assistant = await this.client.ai.assistants.create({
        name,
        model,
        instructions,
      });
      return assistant;
    } catch (error) {
      console.error('Error creating assistant:', error);
      throw error;
    }
  }

  async listAssistants(): Promise<TelnyxAssistant[]> {
    try {
      const response = await this.client.ai.assistants.list();
      return response.data || response;
    } catch (error) {
      console.error('Error listing assistants:', error);
      throw error;
    }
  }

  async updateAssistant(id: string, updates: Partial<TelnyxAssistant>): Promise<TelnyxAssistant> {
    try {
      const assistant = await this.client.ai.assistants.update(id, updates);
      return assistant;
    } catch (error) {
      console.error('Error updating assistant:', error);
      throw error;
    }
  }

  async listPhoneNumbers(): Promise<TelnyxPhoneNumber[]> {
    try {
      const response = await this.client.phoneNumbers.list();
      return response.data || response;
    } catch (error) {
      console.error('Error listing phone numbers:', error);
      throw error;
    }
  }

  async updatePhoneNumber(phoneNumber: string, connectionId?: string, messagingProfileId?: string): Promise<TelnyxPhoneNumber> {
    try {
      const update = await this.client.phoneNumbers.update(phoneNumber, {
        connection_id: connectionId,
        messaging_profile_id: messagingProfileId,
      });
      return update;
    } catch (error) {
      console.error('Error updating phone number:', error);
      throw error;
    }
  }

  async listMessagingProfiles(): Promise<TelnyxMessagingProfile[]> {
    try {
      const response = await this.client.messagingProfiles.list();
      return response.data || response;
    } catch (error) {
      console.error('Error listing messaging profiles:', error);
      throw error;
    }
  }

  async createMessagingProfile(name: string): Promise<TelnyxMessagingProfile> {
    try {
      const profile = await this.client.messagingProfiles.create({ name });
      return profile;
    } catch (error) {
      console.error('Error creating messaging profile:', error);
      throw error;
    }
  }
}