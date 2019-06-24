const functions = require('firebase-functions');

// Listen for updates to any 'games' document.
exports.resetGame2 = functions.firestore
    .document('game/{gameId}')
    .onUpdate((change, context) => {
      // Retrieve the current and previous value
      const currentdata = change.after.data();
      const previousData = change.before.data();
      // const creator = snap.data().creator.uid
      // const joiner = snap.data().joiner.uid
      
      // We'll only update if another user submits.
      if (currentdata.lastUpdatedBy.uid === previousData.lastUpdatedBy.uid) return null;
      
      let gameStatus = currentdata.gameStatus;
      let modCount = currentdata.count;

      if (modCount > 9) {
        console.log(">9 count reached resetting gameStatus")
          gameStatus = "RESET"
          modCount = 0
      } else {
        console.log("count not reached continue playing, count: ", currentdata.count)
        gameStatus = "INPROGRESS"
      }

      // Then return a promise of an update operation to update firestore
      return change.after.ref.update({
        gameStatus: gameStatus,
        count: modCount
      }, {merge: true});
    });
