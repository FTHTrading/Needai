import fs from 'fs';
import path from 'path';

export interface AIScript {
  persona: string;
  scriptId: string;
  content: string;
  variables: { [key: string]: string };
  decisionTree: ScriptNode[];
}

export interface ScriptNode {
  id: string;
  type: 'greeting' | 'question' | 'response' | 'action' | 'transfer';
  content: string;
  options?: { text: string; nextNode: string }[];
  nextNode?: string;
  conditions?: { variable: string; operator: string; value: string; nextNode: string }[];
}

export class AIScriptLoader {
  private scripts: Map<string, AIScript> = new Map();
  private personasPath: string;

  constructor(personasPath: string = path.join(process.cwd(), 'personas')) {
    this.personasPath = personasPath;
    this.loadScripts();
  }

  private loadScripts() {
    try {
      const personaFiles = fs.readdirSync(this.personasPath)
        .filter(file => file.endsWith('.md'));

      for (const file of personaFiles) {
        const personaName = file.replace('.md', '');
        const filePath = path.join(this.personasPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');

        const script = this.parseMarkdownToScript(personaName, content);
        this.scripts.set(personaName, script);
      }
    } catch (error) {
      console.error('Error loading AI scripts:', error);
    }
  }

  private parseMarkdownToScript(persona: string, content: string): AIScript {
    // Parse markdown content into structured script
    const lines = content.split('\n');
    const decisionTree: ScriptNode[] = [];
    const variables: { [key: string]: string } = {};

    let currentNode: Partial<ScriptNode> | null = null;

    for (const line of lines) {
      if (line.startsWith('# ')) {
        // Section marker (ignored in current script format)
      } else if (line.startsWith('## ')) {
        if (currentNode) {
          decisionTree.push(currentNode as ScriptNode);
        }
        currentNode = {
          id: line.substring(3).toLowerCase().replace(/\s+/g, '_'),
          type: 'greeting',
          content: '',
          options: []
        };
      } else if (line.startsWith('```')) {
        // Handle code blocks (script content)
        if (currentNode) {
          const codeStart = lines.indexOf(line) + 1;
          const codeEnd = lines.indexOf('```', codeStart);
          if (codeEnd > codeStart) {
            currentNode.content = lines.slice(codeStart, codeEnd).join('\n');
          }
        }
      } else if (line.startsWith('* ')) {
        // Handle list items
        if (currentNode && currentNode.options) {
          currentNode.options.push({
            text: line.substring(2),
            nextNode: ''
          });
        }
      }
    }

    if (currentNode) {
      decisionTree.push(currentNode as ScriptNode);
    }

    return {
      persona,
      scriptId: `${persona}_script`,
      content,
      variables,
      decisionTree
    };
  }

  getScript(persona: string): AIScript | undefined {
    return this.scripts.get(persona);
  }

  getAllScripts(): AIScript[] {
    return Array.from(this.scripts.values());
  }

  getScriptContent(persona: string): string {
    const script = this.scripts.get(persona);
    return script ? script.content : '';
  }

  executeScript(persona: string, userInput?: string, context?: any): ScriptNode | null {
    void userInput;
    void context;
    const script = this.scripts.get(persona);
    if (!script) return null;

    // Simple script execution - start with first node
    if (script.decisionTree.length > 0) {
      return script.decisionTree[0];
    }

    return null;
  }

  reloadScripts() {
    this.scripts.clear();
    this.loadScripts();
  }
}
