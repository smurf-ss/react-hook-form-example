import Grid from "@material-ui/core/Grid";

import BasicFormExample from "./pages/BasicFormExample";
import FieldArrayExample from "./pages/FieldArrayExample";

function App() {
  return (
    <Grid
      container
      spacing={3}
      direction='column'
      justify='center'
      alignItems='center'>
      <Grid item>
        <BasicFormExample />
      </Grid>
      <Grid item>
        <FieldArrayExample />
      </Grid>
    </Grid>
  );
}

export default App;
