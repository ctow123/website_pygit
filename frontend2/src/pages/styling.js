// uses material-ui styles to create classes for styling certain html components

const styles = theme => ({
  // padding top will provide spacing for the navigation bar
  root: {
    root2: {
      background: "red"
    },
    ...theme.mixins.gutters(),
    paddingTop: '70px',
    paddingBottom: theme.spacing(2),
    minHeight: '100vh',
    backgroundColor: 'white'
  },

  MuiButton: {
    padding: 0
  },
  listitem:{
    height: '45px',
    'border-bottom': '1px solid #ddd',
    'border-bottom-width': '1px',
    'border-bottom-style': 'solid',
    'border-bottom-color': 'rgb(221, 221, 221)',
    'margin-left':'20%',
    'margin-right': '20%',
    'text-align': 'center',
    display:'grid',
  },
  centered: {
    margin: 'auto', // https://learnlayout.com/max-width.html
    'margin-bottom': '20px',
    maxWidth: '600px'
  },
  centerChildren: {
    display: 'flex',
    justifyContent: "center"
  },
  MuiPaper: {
    display: 'flex',
    justifyContent: "center"
  },
  Applogo: {
    animation: "App-logo-spin infinite 20s linear",
    height: "40vmin",
    "pointer-events": "none"
  },
  Appheader: {
    "background-color": "#282c34",
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
    "justify-content": "center",
    "font-size": `calc(10px + 2vmin)`,
    color: "white"
  }
});

export  {
  styles
}
