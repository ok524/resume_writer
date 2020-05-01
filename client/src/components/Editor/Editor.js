import React from 'react';
import Script from 'react-load-script'

class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editor: null,
      value: null
    };
  }

  handleScriptLoad() {
    //const value = this.props.value || '';
    window.tinyMCE.init({
      selector: '#' + this.props.id,
      init_instance_callback: function (editor) {
        editor.show();
        this.setState({ 'editor': editor })
        editor.setContent(this.state.value);
        //editor.name = name;
        editor.on('Change', function (e) {
          this.props.onChange(editor.getContent({ format: 'text' }));
        }.bind(this));
      }.bind(this),
      toolbar: 'languagetool',
      menubar: false,
      statusbar: true,
      height: this.props.height,
      ac_url: process.env.REACT_APP_WEB_API_URL + '/autoComplete',
      lt_url: process.env.REACT_APP_LANG_CHECK_API_URL + "/v2/check",
      lt_debug: "0",
      lt_lang: "en-US",
      lt_mode: "new_word",
      lt_highlight_click: "left",
      lt_full_message: "0",
      lt_max_instances: "2",
      lt_timer: "100",
      plugins: ['code paste'],
      external_plugins: {
        'languagetool': process.env.PUBLIC_URL + "/tinymce/plugins/languagetool/plugin.min.js",
        'autocomplete': process.env.PUBLIC_URL + "/tinymce/plugins/autocomplete/plugin.js"
      }
    });
  }

  componentDidMount() {
    this.handleScriptLoad();
  }

  componentWillUnmount() {
    if (this.state.editor) {
      this.state.editor.remove();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value) {
      if (state.editor) {
        if (state.editor.getContent() === '') {
          state.editor.setContent(props.value);
        }

      }
      return {
        value: props.value
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  render() {
    return (
      <textarea id={this.props.id} name={this.props.name} label={this.props.label} margin="normal" style={{ display: 'none' }} />
    )
    //return <textarea id={this.props.id}></textarea>;
  }
}

export default Editor;