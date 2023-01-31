import PreviousOrder from "./previous-order";
import { useRestaurantQuery } from '@framework/restaurant/restaurant-details';
import { useCart } from '@contexts/cart/cart.context';
import { usePreviousOrderQuery } from '@framework/order/get-previos-order';
import { useTableQuery } from '@framework/table/table-details';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Bill = () => {
    const { data: restaurantData } = useRestaurantQuery();
    const { items, total } = useCart();
    const { data: previousOrderData } = usePreviousOrderQuery();
    const { data: tableData } = useTableQuery();

    console.log(tableData)

    return ( 
        <div style={{height:"120vh", overflowY: "scroll"}}>
        <div style={{width: '90%', margin: '40px auto'}}>
        <div className="flex px-5 border rounded-md py-3 cursor-pointer">
        <div className="flex-grow">
          <h1 className="text-red-500 text-lg">
            My Previous Orders ({previousOrderData?.orders.length || 0})
          </h1>
        </div>
        <div className="flex-none">
          <AiOutlineArrowRight className="mt-1 text-red-500 text-lg" />
        </div>
      </div>
      </div>

        <h2 style={{paddingLeft: '6%', fontSize: "1.2em", color: "black", marginTop: "30px"}}>Invoice</h2>
        <div className="billContainer">
            
            <div className="resturantDes">
                <h3>{restaurantData?.name}</h3>
                <p>{restaurantData?.address}</p>
            </div>
            <div className="billDes">
            <div className="topBillDes">
            <span>Invoice id:</span>
            <span>Date: Mar 11, 2022</span>
            </div>
            <div className="bottomBillDes">
                <span>Billed By:</span>
                <span>Dine In: {tableData?.tableName}</span>
            </div>
            </div>
            <div className="bill">
                <div className="billHead">
                <span className="flex2">Particular</span>
                <span className="flex1">RATE</span>
                <span className="flex1">QTY</span>
                <span className="flex1">SUBTOTAL</span>
                </div>
                {items && items.map((item)=>{
                    return(
                    <div className="billBody">
                    <div className="particular flex2">
                    <div className="billType">
                       <b>KOT #564</b> 
                    </div>
                    <div className="billSingle">
                    {item.name}
                    </div>
                    </div>
                    <div className="rate flex1">
                    Rs {item.price}
                    </div>
                    <div className="qty flex1">
                    {item.quantity}
                    </div>
                    <div className="subTotal flex1">
                    Rs {item.itemTotal}
                    </div>
                    </div>
                    )
                })}
                
                
            </div>
            <hr />
            <div className="totalBill">
                <div className="subTotal">
                <span>Subtotal</span>
                <span>Rs 45,000</span>
                </div>
                <div className="serviceCharge">
                <span>Service Charge</span>
                <span>Rs 1223</span>
                </div>
                <div className="discount">
                <span>Discount: 12%</span>
                <span>Rs 300</span>
                </div>
            </div>
            <div className="grandTotal">
            <span>GRAND TOTAL</span>
            <span>Rs {total.toFixed(2)}/-</span>
            </div>
            <div className="remarks">
            Remarks: Hello
            </div>
            <div className="thankyou">
            Thank You very much
            </div>
            <div className="restroxOS">
            RestroX: Restaurant Operating System
            </div>
        </div>
        </div>
     );
}
 
export default Bill;