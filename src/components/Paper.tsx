import PaperMaterial from "@material-ui/core/Paper";
import styled from "styled-components";

type StyledPaperProps = { padding?: number | string; width?: number | string };

const Paper = styled(PaperMaterial)(
  ({ padding = 50, width = "100%" }: StyledPaperProps) => ({
    padding,
    width,
  })
);

export default Paper;
