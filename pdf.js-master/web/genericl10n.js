/* Copyright 2017 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @typedef {import("./interfaces").IL10n} IL10n */

import { FluentBundle, FluentResource } from "fluent-bundle";
import { DOMLocalization } from "fluent-dom";
import { L10n } from "./l10n.js";

/**
 * @implements {IL10n}
 */
class GenericL10n extends L10n {
  constructor(lang) {
    super({ lang });
    this._setL10n(
      new DOMLocalization(
        [],
        GenericL10n.#generateBundles.bind(
          GenericL10n,
          "en-US",
          this.getLanguage()
        )
      )
    );
  }

  /**
   * Generate the bundles for Fluent.
   * @param {String} defaultLang - The fallback language to use for
   *   translations.
   * @param {String} baseLang - The base language to use for translations.
   */
  static async *#generateBundles(defaultLang, baseLang) {
    const { baseURL, paths } = await this.#getPaths();
    const langs =
      baseLang === defaultLang ? [baseLang] : [baseLang, defaultLang];
    for (const lang of langs) {
      const bundle = await this.#createBundle(lang, baseURL, paths);
      if (bundle) {
        yield bundle;
      }
    }
  }

  static async #createBundle(lang, baseURL, paths) {
    const path = paths[lang];
    if (!path) {
      return null;
    }
    const url = new URL(path, baseURL);
    const data = await fetch(url);
    const text = await data.text();
    const resource = new FluentResource(text);
    const bundle = new FluentBundle(lang);
    const errors = bundle.addResource(resource);
    if (errors.length) {
      console.error("L10n errors", errors);
    }
    return bundle;
  }

  static async #getPaths() {
    const { href } = document.querySelector(`link[type="application/l10n"]`);
    const data = await fetch(href);
    const paths = await data.json();
    return { baseURL: href.replace(/[^/]*$/, "") || "./", paths };
  }
}

export { GenericL10n };
