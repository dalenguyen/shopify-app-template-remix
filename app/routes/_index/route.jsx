import React from "react";

import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

import indexStyles from "./style.css";

export const links = () => [{ rel: "stylesheet", href: indexStyles }];

export async function loader({ request }) {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return null;
}

export default function App() {
  return (
    <div className="index">
      <div className="content">
        <h1>A short heading about [your app]</h1>
        <p>A tagline about [your app] to convert your customers.</p>
        <Form method="post" action="/auth/login">
          <label>
            <span>Shop domain</span>
            <input type="text" name="shop" />
            <span>e.g: my-shop-domain.myshopify.com</span>
          </label>
          <button type="submit">Log in</button>
        </Form>
        <ul>
          <li>
            <strong>Value prop</strong>. Some detail about your value prop that
            convinces your customer.
          </li>
          <li>
            <strong>Value prop</strong>. Some detail about your value prop that
            convinces your customer.
          </li>
          <li>
            <strong>Value prop</strong>. Some detail about your value prop that
            convinces your customer.
          </li>
        </ul>
      </div>
    </div>
  );
}
