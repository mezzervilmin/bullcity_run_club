"use client";
import Barcode from "react-barcode";

export const SignInBarcode: React.FC<{ code: string }> = ({ code }) => {
  return <Barcode value={code} format="CODE39" width={3} />;
};
