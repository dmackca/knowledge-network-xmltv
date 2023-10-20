import { parse } from "node-html-parser";
import axios from "axios";

// month name mapping
const monthsMap = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

// @temp
import html from "./_html.mjs";

function parseDay(dayHtml) {
  const year = new Date().getFullYear();

  const [, monthStr, day] = dayHtml.id.split("-");
  const month = monthsMap.indexOf(monthStr);
  const dateObj = new Date(year, month, day);
  console.log("m %s, d %s", month, day, dateObj);
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
