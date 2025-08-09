interface Tracker {
  id: string;
  name: string;
  type: "firewall" | "antivirus" | "vpn";
  status: "online" | "offline";
  timestamp: number;
}

interface TrackerEvent {
  id: string;
  timestamp: number;
  eventType: "startup" | "shutdown" | "error";
  message: string;
}

class SecurityTracker {
  private trackers: Tracker[] = [];
  private events: TrackerEvent[] = [];

  addTracker(tracker: Tracker) {
    this.trackers.push(tracker);
    this.logEvent(tracker.id, "startup", "Tracker started");
  }

  removeTracker(id: string) {
    this.trackers = this.trackers.filter((tracker) => tracker.id !== id);
    this.logEvent(id, "shutdown", "Tracker stopped");
  }

  updateTrackerStatus(id: string, status: "online" | "offline") {
    const tracker = this.trackers.find((tracker) => tracker.id === id);
    if (tracker) {
      tracker.status = status;
      this.logEvent(id, "status_update", `Tracker status changed to ${status}`);
    }
  }

  private logEvent(id: string, eventType: "startup" | "shutdown" | "error", message: string) {
    const event: TrackerEvent = {
      id,
      timestamp: Date.now(),
      eventType,
      message,
    };
    this.events.push(event);
  }

  printEvents() {
    console.log("Events:");
    this.events.forEach((event) => console.log(`${event.timestamp} - ${event.eventType}: ${event.message}`));
  }
}

const tracker = new SecurityTracker();

tracker.addTracker({ id: "fw1", name: "Firewall 1", type: "firewall", status: "online", timestamp: Date.now() });
tracker.updateTrackerStatus("fw1", "offline");
tracker.removeTracker("fw1");

tracker.printEvents();