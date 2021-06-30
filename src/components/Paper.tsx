import PaperMaterial from "@material-ui/core/Paper";
import styled from "styled-components";

type StyledPaperProps = {
  padding?: number | string;
  width?: number | string;
  height?: number | string;
};

const Paper = styled(PaperMaterial)(
  ({ padding = 50, width = "100%", height = "100%" }: StyledPaperProps) => ({
    padding,
    width,
    height,
  })
);

export default Paper;
