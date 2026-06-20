import clock from "clock";
import document from "document";
import { today as activity } from "user-activity";
// Import user settings to check if the watch is set to Metric (KM) or Imperial (Miles)
import { units } from "user-settings";

clock.granularity = "seconds";

const txtHours = document.getElementById("txtHours");
const txtMins = document.getElementById("txtMins");
const txtDate = document.getElementById("txtDate");

const activityGroup = document.getElementById("activityGroup");
const imgActivity = document.getElementById("imgActivity");
const txtActivity = document.getElementById("txtActivity");

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let secondsCounter = 0;

// 🔒 Asset Mappings (Swapped out active zone minutes for location pointer)
const METRIC_ASSETS = {
  steps: "emojis/running-shoe.png",
  calories: "emojis/cal_icon.png",
  distance: "emojis/location.png"
};

clock.ontick = (evt) => {
  let today = evt.date;

  // 1. Time & Date Rendering
  let hours = today.getHours() % 12;
  if (hours === 0) hours = 12;
  txtHours.text = hours < 10 ? "0" + hours : "" + hours;
  
  let mins = today.getMinutes();
  txtMins.text = mins < 10 ? "0" + mins : "" + mins;
  
  txtDate.text = `${days[today.getDay()]} ${today.getDate()}`;
  
  // 2. Fetch Metrics
  secondsCounter++;
  
  let stepsCount = (activity.local.steps || 0).toLocaleString();
  let caloriesCount = (activity.local.calories || 0).toLocaleString();
  
  // Calculate distance: Convert raw meters based on system configuration preferences
  let rawDistance = activity.local.distance || 0; 
  let formattedDistance = "";
  
  if (units.distance === "us") {
    // Convert meters to miles, fixed to 2 decimal places
    formattedDistance = ((rawDistance * 0.000621371).toFixed(2)) + " mi";
  } else {
    // Convert meters to kilometers, fixed to 2 decimal places
    formattedDistance = ((rawDistance / 1000).toFixed(2)) + " km";
  }

  let nextImage = METRIC_ASSETS.steps;
  let nextText = stepsCount;

  // 3. 5-Second Carousel Loop Logic
  if (secondsCounter < 3) {
    nextImage = METRIC_ASSETS.steps;
    nextText = stepsCount;
  } else if (secondsCounter < 6) {
    nextImage = METRIC_ASSETS.calories;
    nextText = caloriesCount;
  } else if (secondsCounter < 9) {
    nextImage = METRIC_ASSETS.distance;
    nextText = formattedDistance; // Displays distance smoothly with unit suffix
  } else {
    nextImage = METRIC_ASSETS.steps;
    nextText = stepsCount;
    secondsCounter = 0;
  }

  // 🛠️ Asset Loading Thread Flush Cache Protect
  if (imgActivity.href !== nextImage) {
    imgActivity.href = ""; 
    imgActivity.href = nextImage;
  }
  txtActivity.text = nextText;

  // 4. Centering Layout Engine Calculations
  let textWidth = txtActivity.text.length * 16.5; 
  // Account for smaller text metrics space when decimal symbols or commas appear
  if (txtActivity.text.indexOf(',') !== -1 || txtActivity.text.indexOf('.') !== -1) textWidth -= 6; 
  
  let totalRowWidth = 40 + textWidth; 
  let targetX = 168 - (totalRowWidth / 2);
  
  activityGroup.groupTransform.translate.x = targetX;
  activityGroup.groupTransform.translate.y = 268; 
};