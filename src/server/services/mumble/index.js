export default function mumble() {
  const that = this;

  that.service('mumble', {
    async setup() {
      // Connect to the different regional mumble servers here and authenticate
    },

    // Create a mumble channel here
    async create({ name }) {

    },

    // Delete a mumble channel here
    async delete({ name }) {

    },
  });
}
