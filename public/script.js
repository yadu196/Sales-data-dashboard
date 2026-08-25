const salesTargetMap = {
  "2026-06-27": { totalUnits: 950 },
  "2026-06-28": { totalUnits: 1120 },
  "2026-06-29": { totalUnits: 1280 },
  "2026-06-30": { totalUnits: 1400 }
};

function formatCurrency(amount) {
  return "\u20b9" + Number(amount).toLocaleString("en-IN");
}

function setTrendClass(elementId, trendType) {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.classList.remove("positive", "negative", "neutral");

  if (trendType === "positive") {
    element.classList.add("positive");
  } else if (trendType === "negative") {
    element.classList.add("negative");
  } else {
    element.classList.add("neutral");
  }
}

function updateTrendBars(selectedDate) {
  const maxUnits = 1400;

  Object.keys(salesTargetMap).forEach(function (date) {
    const bar = document.getElementById("bar-" + date);
    if (!bar) return;

    const units = salesTargetMap[date].totalUnits;
    const widthPercentage = (units / maxUnits) * 100;

    bar.style.width = widthPercentage + "%";

    if (date === selectedDate) {
      bar.classList.add("active");
    } else {
      bar.classList.remove("active");
    }
  });
}

async function updateDashboard(reportDate) {
  const insightElement = document.getElementById("insightText");

  try {
    const apiUrl = `/api/sales?report_date=${encodeURIComponent(reportDate)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      if (insightElement) {
        insightElement.textContent = data.error || "Unable to fetch sales data.";
      }
      return;
    }

    document.getElementById("totalUnits").textContent = Number(data.total_units_sold).toLocaleString();
    document.getElementById("totalRevenue").textContent = formatCurrency(data.total_revenue);
    document.getElementById("topCountry").textContent = data.top_country;
    document.getElementById("activationRate").textContent = data.activation_success_rate + "%";

    document.getElementById("unitsTrend").textContent = data.units_trend;
    document.getElementById("revenueTrend").textContent = data.revenue_trend;
    document.getElementById("activationStatus").textContent = data.activation_status;
    if (insightElement) {
      insightElement.textContent = data.insight;
    }

    setTrendClass("unitsTrend", data.trend_type);
    setTrendClass("revenueTrend", data.trend_type);

    if (data.activation_success_rate >= 90) {
      setTrendClass("activationStatus", "positive");
    } else {
      setTrendClass("activationStatus", "negative");
    }

    updateTrendBars(reportDate);
  } catch (error) {
    if (insightElement) {
      insightElement.textContent = "Unable to connect to backend API.";
    }
    console.error("Dashboard fetch error:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const reportDateSelect = document.getElementById("reportDate");
  if (!reportDateSelect) return;

  reportDateSelect.addEventListener("change", function () {
    updateDashboard(reportDateSelect.value);
  });

  updateDashboard(reportDateSelect.value);
});
