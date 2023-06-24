import { FunctionComponent, useMemo } from "react"
import { DateTime } from "luxon"

// components
import TransactionList from "../TransactionList"

// stores, enums
import { TRANSACTIONKIND, TRANSACTIONSTATUS, FIATCURRENCY, STABLES } from "../../utils/enums"
import useUserOrdersStore from "../../stores/userOrders"

const UserTransactions: FunctionComponent = () => {
  const { orders } = useUserOrdersStore()

  const emptyList = useMemo(() => {
    return orders.length === 0
  }, [orders])

  const transactions = useMemo(() => {
    return orders.map((order) => ({
      from: order.kind === TRANSACTIONKIND.OFFRAMP ? STABLES[order.token] : FIATCURRENCY[order.fiat],
      to: order.kind === TRANSACTIONKIND.OFFRAMP ? FIATCURRENCY[order.fiat] : STABLES[order.token],
      status: TRANSACTIONSTATUS[order.status!],
      fiatRate: order.fiatRate.toString(),
      tokenRate: order.tokenRate.toString(),
      date: DateTime.fromISO(order.createdAt!).toLocaleString(DateTime.DATE_MED),
      fromAmount: order.kind === TRANSACTIONKIND.ONRAMP ? `₵${order.fiatAmount.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}` : `${order.tokenAmount.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })} ${STABLES[order.token]}`,
      toAmount: order.kind === TRANSACTIONKIND.ONRAMP ? `${order.tokenAmount.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })} ${STABLES[order.token]}` : `₵${order.fiatAmount.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`,
    }))
  }, [orders])

  return (
    <div>
      <p
        className='text-2xl font-thin underline mb-2 text-black'
      >Transactions</p>
      {emptyList ? (
        <div className="flex items-center justify-center h-[250px]">
          <p className="text-center">You have no transactions yet</p>
        </div>
      ): (
        <TransactionList
          data={transactions}
        />
      )}
    </div>
  )
}

export default UserTransactions
