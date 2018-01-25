// Definition of Transaction model.

function Transaction(attrs = {}) {
  this.attrs = attrs;
}

Transaction.prototype = {
  errors: [],
  isValid() {
    const attrs = this.attrs;
    this.errors = [];
    if (!attrs.action) {
      this.errors.push('Action is required');
    }

    if (!attrs.asset) {
      this.errors.push('Asset is required');
    }

    if (!attrs.owner) {
      this.errors.push('Owner is required');
    }

    if (!attrs.username) {
      this.errors.push('Username is required');
    }

    if (!attrs.isMessage) {
      this.errors.push('Message is required');
    }

    if (!attrs.time) {
      this.errors.push('Time is required');
    }

    if (attrs.action !== 'create') {
      this.errors.push('Action must be "create"');
    }

    return this.errors.length === 0;
  }
};

module.exports = Transaction;
