export class DateManager {
  static format(timestamp: string) {
    const date = new Date(timestamp);

    const localDate = date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });

    return localDate.replace(/\//g, ".");
  }
}
