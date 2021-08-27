import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  AppBar,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import SpeechToText from "speech-to-text";

import supportedLanguages from "./supportedLanguages";

import EditorWithCode from "./Editor";
import formatter from "html-formatter";

const styles = (theme) => ({
  root: {
    paddingTop: 65,
    paddingLeft: 11,
    paddingRight: 11,
  },
  flex: {
    flex: 1,
  },
  grow: {
    flexGrow: 1,
  },
  paper: theme.mixins.gutters({
    paddingTop: 22,
    paddingBottom: 22,
    spacing: 8,
  }),
});

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

async function postData(url, data) {
  console.log(data);
  const response = await fetch(url, {
    method: "Post",
    headers: myHeaders,
    body: JSON.stringify(data),
  });
  return await response.json();
}

async function downloadCode() {
  const url = "http://localhost:3000/api/download-html";
  const response = await fetch(url, {
    method: "GET",
  });
  return await response;
}
class SpeechToTextDemo extends Component {
  state = {
    error: "",
    interimText: "",
    finalisedText: [],
    listening: false,
    language: "en-US",
    code: "",
  };

  onAnythingSaid = (text) => {
    this.setState({ interimText: text });
  };

  onEndEvent = () => {
    if (!isWidthUp("sm", this.props.width)) {
      this.setState({ listening: false });
    } else if (this.state.listening) {
      this.startListening();
    }
  };

  onFinalised = (text) => {
    let responseObj = {};
    this.setState({
      finalisedText: [text, ...this.state.finalisedText],
      interimText: "",
    });
    console.log(this.state.finalisedText[0]);
    let response = postData("http://localhost:3000/api/commands/get-html", {
      str: this.state.finalisedText[0],
    });
    console.log(response);
    response.then((value) => {
      responseObj = value;
      console.log(responseObj.html);
      if (responseObj.html === undefined);
      else {
        this.setState({
          code: formatter.render(responseObj.html),
        });
      }
    });
  };

  startListening = () => {
    try {
      this.listener = new SpeechToText(
        this.onFinalised,
        this.onEndEvent,
        this.onAnythingSaid,
        this.state.language
      );
      this.listener.startListening();
      this.setState({ listening: true });
    } catch (err) {}
  };

  stopListening = () => {
    this.listener.stopListening();
    this.setState({ listening: false });
  };

  render() {
    const { error, interimText, finalisedText, listening, language } =
      this.state;
    const { classes } = this.props;
    let content;
    if (error) {
      content = (
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {error}
          </Typography>
        </Paper>
      );
    } else {
      let buttonForListening;

      if (listening) {
        buttonForListening = (
          <Button color="primary" onClick={() => this.stopListening()}>
            Stop Listening
          </Button>
        );
      } else {
        buttonForListening = (
          <Button
            color="primary"
            onClick={() => this.startListening()}
            variant="contained"
          >
            Start Listening
          </Button>
        );
      }
      content = (
        <Grid container spacing={8}>
          <Grid item xs={12} md={7}>
            <Paper className={this.props.classes.paper}>
              <Grid container spacing={8}>
                <Grid item xs={12} lg={6}>
                  <Typography variant="overline" gutterBottom>
                    Status: {listening ? "listening..." : "finished listening"}
                  </Typography>
                  {buttonForListening}
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={language}
                      onChange={(evt) =>
                        this.setState({ language: evt.target.value })
                      }
                      disabled={listening}
                    >
                      {supportedLanguages.map((language) => (
                        <MenuItem key={language[1]} value={language[1]}>
                          {language[0]}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      What language are you going to speak in?
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper className={this.props.classes.paper}>
              <Typography variant="overline" gutterBottom>
                Current utterances
              </Typography>
              <Typography variant="body1" gutterBottom>
                {interimText}
              </Typography>
            </Paper>

            <Button
              href="http://localhost:3000/api/commands/download-html"
              color="primary"
              onClick={() => downloadCode()}
              target="_blanc"
              download
            >
              Download Code
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container>
                <Grid
                  item
                  xs={8}
                  my={100}
                  marginY={100}
                  pr={10}
                  style={{ marginRight: "25px" }}
                >
                  <EditorWithCode
                    codeText={this.state.code}
                    style={{ height: "100%" }}
                  />
                </Grid>
                <Grid item xs={3} ml={25}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">Finalised Text</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {finalisedText.map((str, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              {str}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.grow} color="inherit">
              Fractal AI-SERVER-QODER
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container justifyContent="center" className={classes.root}>
          <Grid item xs={12} sm={8}>
            <Grid container>
              <Grid item xs={12}></Grid>
            </Grid>
            {content}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withWidth()(withStyles(styles)(SpeechToTextDemo));
