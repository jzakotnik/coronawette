import Button from "@mui/material/Button";

export default function Navigation({ calculate, clear, load }) {
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          clear();
        }}
      >
        Neustart
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          calculate();
        }}
      >
        Berechnen
      </Button>
    </div>
  );
}
