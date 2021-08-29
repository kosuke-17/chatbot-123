import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from './TextInput';


export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      description: ""
    }

    this.inputName = this.inputName.bind(this)
    this.inputEmail = this.inputEmail.bind(this)
    this.inputDescription = this.inputDescription.bind(this)
  }

  inputName = (event) => {
    this.setState({ name: event.target.value })
  }

  inputEmail = (event) => {
    this.setState({ email: event.target.value })
  }

  inputDescription = (event) => {
    this.setState({ description: event.target.value })
  }


  submitForm = () => {
    const name = this.state.name
    const email = this.state.email
    const description = this.state.description

    const payload = {
      text:'お問い合わせあり\n'+
            '名前：' + name + '\n'+
            'アドレス：' + email + '\n'+
            '内容\n' + description
    }
    const url = "https://hooks.slack.com/services/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"

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload)
    }).then(() => {
      alert('送信が完了しました。')
      this.setState({
        name: "",
        email: "",
        description: "",
      })
      return this.props.handleClose()
    })
  }
  
  render() {
    return(
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>お問い合わせ</DialogTitle>
          <DialogContent>
            <TextInput
              label={"お名前(必須)"}
              multiline={false}
              rows={1}
              value={this.setState.name}
              type={"text"}
              onChange={this.inputName}
            />
            <TextInput
              label={"メールアドレス(必須)"}
              multiline={false}
              rows={1}
              value={this.setState.email}
              type={"email"}
              onChange={this.inputEmail}
            />
            <TextInput
              label={"お問い合わせ内容(必須)"}
              multiline={true}
              rows={5}
              value={this.setState.description}
              type={"text"}
              onChange={this.inputDescription}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={this.submitForm} color="primary" autoFocus>
            送信
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}