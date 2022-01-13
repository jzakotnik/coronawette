export default function AxisX({ dates }) {
  console.log("Painting axis X: ", dates);
  var pos = 0;

  const datearray = [];
  dates.forEach((d, i) => {
    //console.log(d);
    const splitDate = d.substring(5).split("-");
    const formattedDate = splitDate[1] + "." + splitDate[0] + ".";

    if (i % 5 == 0) datearray.push({ datestring: formattedDate, posx: i * 10 });
  });

  return (
    <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      {datearray.map((d) => (
        <text key="1" font="5px" x={d.posx} y="20">
          {d.datestring}
        </text>
      ))}
    </svg>
  );
}
