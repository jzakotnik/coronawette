export default function AxisX({ dates, canvasSize }) {
  //console.log("Painting axis X: ", dates);
  var pos = 0;
  const { height, width } = canvasSize;

  const datearray = [];
  dates.forEach((d, i) => {
    //console.log(d);
    const splitDate = d.substring(5).split("-");
    const formattedDate = splitDate[1] + "." + splitDate[0] + ".";

    if (i % 5 == 0) datearray.push({ datestring: formattedDate, posx: i * 10 });
  });

  /*return (
    <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      {datearray.map((d) => (
        <text key={d.posx} font="5px" x={d.posx} y="20">
          {d.datestring}
        </text>
      ))}
    </svg>
  );*/
  return (
    <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <text key={10} font="5px" x={0} y="20">
        Vor 6 Monaten
      </text>
      <text key={20} font="5px" x="430" y="20">
        Heute
      </text>
      <text key={30} font="5px" x="700" y="20">
        In 6 Monaten
      </text>
    </svg>
  );
}
