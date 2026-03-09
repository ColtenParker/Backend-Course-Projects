db.commsCount.drop();

db.createView('commsCount', 'users', [
    { $match: { 'notificationSettings.comms': false } },
    { $group: { _id: '$notificationSettings.comms', count: { $sum: 1 } } },
]);

db.commsCount.find();