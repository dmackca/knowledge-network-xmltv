import { parse } from "node-html-parser";
import axios from "axios";
import { parse as parseDateString } from "date-fns";

// @temp
import html from "./_html.mjs";

function getTime(showHtml, date) {
  const timeHtml = showHtml.querySelector(".time > h5");
  const timeString = timeHtml.text;
  return parseDateString(timeString, "h:mma", date);
}

function parseShow(showHtml, date) {
  //   const detailsHtml = showHtml.querySelector(".row");
  console.log("show (time=%s)", getTime(showHtml, date));
}

function parseDay(dayHtml) {
  const [, monthString, day] = dayHtml.id.split("-");

  const dateObj = parseDateString(
    `${monthString}-${day}`,
    "MMM-dd",
    new Date()
  );
  console.log("pppp", dateObj);

  const shows = dayHtml.querySelectorAll(".schedule-row");
  shows.forEach((showHtml) => {
    parseShow(showHtml, dateObj);
  });
}

function getDays(pageHtml) {
  const root = parse(pageHtml);
  const days = root.querySelectorAll("#schedule .schedule-grid .day.row");
  return days;
}

export default async (req, res) => {
  //   const { data: html } = await axios.get("https://www.knowledge.ca/schedule");

  const days = getDays(html);
  days.forEach(parseDay);

  return res.json({ foo: "bar" });
};
