navigator.getBattery().then(function (battery) {
    updateBatteryStatus(battery);

    battery.addEventListener('levelchange', function () {
        updateBatteryStatus(battery);
    });

    battery.addEventListener('chargingchange', function () {
        updateBatteryStatus(battery);
    });
});

function updateBatteryStatus(battery) {
    var batteryFill = document.querySelector(".battery-fill");
    var batteryPercentage = document.querySelector(".battery-percentage");
    var batteryStatusText = document.querySelector(".battery-status-text");

    var fillWidth = Math.round(battery.level * 100) + "%";
    batteryFill.style.width = fillWidth;
    batteryPercentage.innerHTML = fillWidth;

    if (battery.charging) {
        batteryStatusText.innerHTML = 'Now Charging';

        // Calculate animation duration based on the time it takes to charge from 0% to the current battery level
        var animationDuration = (battery.level - 0) * 1000; // in milliseconds

        // Apply the animation to the batteryFill element
        batteryFill.style.animation = `fillAnimation ${animationDuration}ms linear`;
    } else {
        batteryStatusText.innerHTML = "Not Charging";

        // Remove the animation when not charging
        batteryFill.style.animation = 'none';
    }
}
