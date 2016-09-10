'use babel';

import WordArtCommentsView from './word-art-comments-view';
import { CompositeDisposable } from 'atom';

export default {

  wordArtCommentsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.wordArtCommentsView = new WordArtCommentsView(state.wordArtCommentsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.wordArtCommentsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'word-art-comments:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.wordArtCommentsView.destroy();
  },

  serialize() {
    return {
      wordArtCommentsViewState: this.wordArtCommentsView.serialize()
    };
  },

  toggle() {
    console.log('WordArtComments was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
