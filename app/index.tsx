import { Redirect } from "expo-router";
import "./globals.css";

export default function App() {
  if (true) return <Redirect href={"/login"} />;
}
