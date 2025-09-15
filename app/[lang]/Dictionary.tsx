// app/[lang]/Dictionary.tsx
// Localized dictionary box: pulls all copy from ./locale via useLang(), matches Vision pattern

'use client'
import AccentText from "@/components/text/AccentText"
import RLink from "@/components/rlink"
import { ROUTES as R } from "@/app/routes"
import { useLang } from "@/components/locale"
import dicts from "./locale"

export default function Dictionary() {
  const lang = useLang()
  const t = (dicts as any)[lang] ?? dicts.en

  return (
    <div
      className=" box has-background-light"
      style={{
        borderLeft: "6px solid #f9a729",
        borderRadius: "12px",
        padding: "2rem",
      }}
    >
      {/* Headword */}
      <p className="is-size-3 is-family-secondary has-text-weight-bold has-text-black mb-2">
        {t.dictionary.headword} <br className="is-hidden-tablet" />
        <span className="is-size-5 has-text-grey">
          {t.dictionary.ipa}
        </span>
      </p>
      <p className="is-size-5 has-text-grey mb-3">{t.dictionary.noun}</p>

      {/* Definitions — desktop */}
      <div className="is-hidden-mobile">
        <AccentText
          as="p"
          text={t.dictionary.def1Long}
          className="is-size-5 has-text-grey-dark mb-3"
          accentClassName="has-text-black has-text-weight-semibold"
        />

        <AccentText
          as="p"
          text={t.dictionary.def2Long}
          className="is-size-5 has-text-grey-dark"
          accentClassName="has-text-black has-text-weight-semibold"
        />
      </div>

      {/* Definitions — mobile (shorter text) */}
      <div className="is-hidden-tablet">
        <AccentText
          as="p"
          text={t.dictionary.def1Short}
          className="is-size-6 has-text-grey-dark mb-2"
          accentClassName="has-text-black has-text-weight-semibold"
        />

        <AccentText
          as="p"
          text={t.dictionary.def2Short}
          className="is-size-6 has-text-grey-dark"
          accentClassName="has-text-black has-text-weight-semibold"
        />
      </div>

      <hr className="my-4" />

      {/* Dictionary notes footer */}
      <div className="columns is-variable is-4 is-multiline">
        <div className="column is-12-tablet is-6-desktop">
          <p className="is-size-7 has-text-grey">
            <span className="has-text-weight-semibold">{t.dictionary.usage}</span>{" "}
            {t.dictionary.usageText}
          </p>
          <p className="is-size-7 has-text-grey">
            <span className="has-text-weight-semibold">
              {t.dictionary.domains}
            </span>{" "}
            {t.dictionary.domainsText}
          </p>
          <p className="is-size-7 has-text-grey">
            <span className="has-text-weight-semibold">{t.dictionary.etymology}</span>{" "}
            {t.dictionary.etymologyText}
          </p>
        </div>
        <div className="column is-12-tablet is-6-desktop is-hidden-mobile">
          <p className="is-size-7 has-text-grey">
            <span className="has-text-weight-semibold">
              {t.dictionary.seeAlso}
            </span>{" "}
            <RLink route={R.cloud.href} className="has-text-grey-dark">
              {t.dictionary.inferenceApi}
            </RLink>
            ,{" "}
            <RLink route={R.node.href} className="has-text-grey-dark">
              {t.dictionary.nodes}
            </RLink>
            ,{" "}
            <RLink route={R.token.href} className="has-text-grey-dark">
              {t.dictionary.tokenomics}
            </RLink>
            ,{" "}
            <RLink route={R.vision.href} className="has-text-grey-dark">
              {t.dictionary.vision}
            </RLink>
          </p>
          <p className="is-size-7 has-text-grey">
            <span className="has-text-weight-semibold">
              {t.dictionary.internalRefs}
            </span>{" "}
            {t.dictionary.internalRefsText}
          </p>
        </div>
      </div>
    </div>
  )
}
