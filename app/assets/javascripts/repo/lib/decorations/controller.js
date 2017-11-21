import editor from '../editor';

class DecorationsController {
  constructor() {
    this.decorations = new Map();
    this.editorDecorations = new Map();
  }

  getAllDecorationsForModel(model) {
    if (!this.decorations.has(model.url)) return [];

    const modelDecorations = this.decorations.get(model.url);
    const decorations = [];

    modelDecorations.forEach(val => decorations.push(...val));

    return decorations;
  }

  addDecorations(model, decorationsKey, decorations) {
    const decorationMap = this.decorations.get(model.url) || new Map();

    decorationMap.set(decorationsKey, decorations);

    this.decorations.set(model.url, decorationMap);

    this.decorate(model);
  }

  decorate(model) {
    const decorations = this.getAllDecorationsForModel(model);
    const oldDecorations = this.editorDecorations.get(model.url) || [];

    this.editorDecorations.set(
      model.url,
      editor.editorInstance.instance.deltaDecorations(oldDecorations, decorations),
    );
  }

  dispose() {
    this.decorations.clear();
    this.editorDecorations.clear();
  }
}

export default new DecorationsController();
