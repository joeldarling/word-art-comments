'use babel';
                                                 
import { CompositeDisposable } from 'atom';
import figlet from 'figlet';

export default {
  subscriptions: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'word-art-comments:convert': () => this.convert()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  convert() {
    const editor = atom.workspace.getActiveTextEditor()
    const selection = editor.getSelectedText();
    if(selection.length<1)
      return;

    const wordArt = figlet.textSync(selection, {
      font: 'Big',
      horizontalLayout: 'default',
      verticalLayout: 'default'
    });
    const toInsert = '\n /*' + wordArt + '*/\n';
    editor.insertText(toInsert);
  }
};
