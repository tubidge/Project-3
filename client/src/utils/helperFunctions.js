const helper = {
  asyncForEach: async function(array, callback) {
    for (let index = 0; index < array.length; index++) {
      console.log("running");

      await callback(array[index], index, array);
    }
  }
};

export default helper;
