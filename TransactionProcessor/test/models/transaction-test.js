const assert = require('assert'),
  { Transaction } = require('../../models');

describe('Transaction', function() {
  describe('Validation', function() {
    describe('isValid()', function() {
      it('should be false when missing attrs', function() {
        const txn = new Transaction({ asset: 'John' });
        assert(!txn.isValid());
      });

      it('should store errors when invalid', function() {
        const txn = new Transaction({ asset: 'John' });
        txn.isValid();
        assert(txn.errors.length);
      });

      it('should be true has required attrs', function() {
        const txn = new Transaction({
          asset: 'John',
          owner: 'John',
          username: 'jsmith',
          isMessage: 'user',
          time: new Date(),
          action: 'create'
        });
        assert(txn.isValid());
      });
    });
  });
});
