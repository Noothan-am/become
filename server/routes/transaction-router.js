const router = require("../utils/router-instance");
const {
  getValues,
  getUserTransactions,
  getAllTransactions,
  makeTransaction,
  updateTransaction,
} = require("../controllers/transaction-controllers");

router.get("/all-transactions", getAllTransactions);
router.post("/get-transactions", getUserTransactions);
router.post("/get-values", getValues);
router.post("/make-transaction", makeTransaction);
router.post("/update-transactions", updateTransaction);

module.exports = router;
