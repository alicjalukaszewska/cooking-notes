import Firebase from "firebase/app";

export function snapshotToArray<T>(
  snapshot: Firebase.database.DataSnapshot
): T[] {
  const returnArr: T[] = [];

  snapshot.forEach(function (childSnapshot) {
    const item = childSnapshot.val();
    item.id = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr;
}

export function timestampsToDates(datesAsTimestamps: number[]): Date[] {
  return datesAsTimestamps.map(
    (timestamp: number) => new Date(timestamp)
  );
}