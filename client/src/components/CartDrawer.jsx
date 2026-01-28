import { X, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CartDrawer({ isOpen, onClose, cartItems, removeFromCart, onCheckout }) {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0)

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-[60]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-[60] flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-bold text-gray-900">Your Cart ({cartItems.length})</h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">Your cart is empty.</p>
                                </div>
                            ) : (
                                cartItems.map((item, index) => (
                                    <div key={`${item.id}-${index}`} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                                            <p className="text-gray-500 text-sm">₹{item.price}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(index)}
                                            className="text-red-500 hover:text-red-700 p-2"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-4 border-t bg-gray-50">
                            <div className="flex justify-between mb-4">
                                <span className="font-semibold text-gray-900">Total</span>
                                <span className="font-bold text-xl text-gray-900">₹{total}</span>
                            </div>
                            <button
                                disabled={cartItems.length === 0}
                                onClick={onCheckout}
                                className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Checkout
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
