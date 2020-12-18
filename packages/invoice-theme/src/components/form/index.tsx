import React, { Fragment } from "react";
import { css, connect, useConnect } from "frontity";
import Button from "../button";
import AddIcon from "../icons/add";
import DeleteIcon from "../icons/delete";
import TemplateSelector from "./template-selector";
import { Packages } from "../../../types";

const Form: React.FC = () => {
  const { state, actions } = useConnect<Packages>();

  const form = css`
    padding: 32px;
    padding-top: 64px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 24px;
    box-sizing: border-box;
  `;

  const fieldset = css`
    border: none;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(min-content, max-content);
    grid-row-gap: 16px;
    grid-column-gap: 24px;
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    @media (min-width: 580px) {
      grid-template-columns: 1fr 0.5fr;
    }
  `;

  const inner = css`
    display: grid;
    grid-row-gap: 16px;
  `;

  const legend = css`
    text-transform: uppercase;
    font-weight: bolder;
    font-size: 2rem;
    padding: 0;
    margin-top: 24px;

    &:first-of-type {
      margin-top: 12px;
    }
  `;

  const legendTwo = css`
    ${legend}
    text-transform: uppercase;
  `;

  const label = css`
    display: flex;
    flex-direction: column;
    white-space: nowrap;
  `;

  const labelSelect = css`
    ${label}
    position: relative;

    &:after {
      content: "‹";
      transform: rotate(-90deg);
      width: 44px;
      height: 44px;
      position: absolute;
      bottom: 8px;
      right: 0;
      font-size: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding-bottom: 3px;
      border-top: 2px solid ${state.theme.colors.two};
    }
  `;

  const input = css`
    font-family: inherit;
    height: 44px;
    font-size: 1rem;
    border: none;
    background-color: ${state.theme.colors.two};
    color: ${state.theme.colors.one};
    padding: 0 12px;
    margin: 0;
    margin-top: 8px;
    box-sizing: border-box;
    outline: none;
    width: 100%;

    &::placeholder {
      color: ${state.theme.colors.three};
      opacity: 0.5;
    }
  `;

  const datesInput = css`
    ${input}
    text-align: center;
  `;

  const numberInput = css`
    ${input}
    text-align: right;
  `;

  const checkboxLabel = css`
    position: relative;
    display: flex;
    align-items: center;
    height: 44px;
    padding-left: 40px;
    cursor: pointer;
    user-select: none;
    margin-right: 12px;
  `;

  const checkboxInput = css`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked {
      & ~ span:after {
        display: block;
      }
    }
    &:disabled {
      & ~ span {
        border: 2px solid #ccc;
      }
    }
  `;

  const checkbox = css`
    position: absolute;
    top: calc(50% - 15px);
    left: 0;
    height: 30px;
    width: 30px;
    border: 2px solid ${state.theme.colors.two};
    box-sizing: border-box;

    &:after {
      content: "";
      position: absolute;
      display: none;
      left: calc(50% - 3.5px);
      top: calc(50% - 8px);
      width: 5px;
      height: 10px;
      border: solid ${state.theme.colors.two};
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  `;

  const taxInput = css`
    ${input}
    width: 50px;
    text-align: center;
    margin: 0;
  `;

  const select = css`
    height: 44px;
    border: 2px solid ${state.theme.colors.two};
    color: ${state.theme.colors.two};
    font-family: inherit;
    font-size: 1rem;
    padding: 0 50px 0 8px;
    margin-bottom: 8px;
    box-sizing: border-box;
    appearance: none;
    outline: none;
    z-index: 5;
    background: transparent;
  `;

  const textarea = css`
    font-family: inherit;
    height: 105px;
    font-size: 1rem;
    border: none;
    background-color: ${state.theme.colors.two};
    color: ${state.theme.colors.one};
    padding: 12px;
    box-sizing: border-box;
    outline: none;
    grid-column: 1 / 3;
    resize: none;
  `;

  const concepts = css`
    ${fieldset}

    @media (min-width: 580px) {
      grid-template-columns: 1fr 1fr;
    }
  `;

  const conceptsInner = css`
    display: grid;
    grid-template-columns: 0.5fr 0.5fr 44px;
    grid-column-gap: 24px;
    grid-row-gap: 12px;
    align-items: end;
    width: 100%;
    margin-top: 12px;

    &:first-of-type {
      margin-top: 0;
    }

    & > label:first-of-type {
      grid-column: 1 / 4;
    }

    input {
      width: 100%;
    }

    @media (min-width: 580px) {
      grid-column: 1/ 3;
      grid-template-columns: 1fr 100px 100px 44px;

      & > label:first-of-type {
        grid-column: 1 / 2;
      }
    }
  `;

  const addConcept = css`
    margin-top: 24px;

    @media (min-width: 580px) {
      grid-column: 1 / 3;
    }
  `;

  const taxInner = css`
    display: flex;
    margin-top: 16px;
  `;

  const percentage = css`
    display: inline !important;
    font-size: 20px;
    margin-left: 8px;
  `;

  const methodFieldset = css`
    ${fieldset}
    & > label:nth-of-type(-n+3) {
      grid-column: 1 / 2;
    }
  `;

  const fieldsetFile = css`
    ${fieldset}
    display: flex;
  `;

  const labelFile = css`
    padding: 8px 60px 8px 12px;
    position: relative;
    display: flex;
    align-items: center;
    min-height: 44px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    background-color: ${state.theme.colors.two};
    color: ${state.theme.colors.one};
    cursor: pointer;
  `;

  const spanFile = css`
    display: flex;
    height: 100%;
    background-color: ${state.theme.colors.one};
    color: ${state.theme.colors.two};
    border: 2px solid ${state.theme.colors.two};
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
    width: 120px;
    justify-content: center;
    align-items: center;
  `;

  const inputFile = css`
    height: 44px;
    opacity: 0;
    position: absolute;
  `;

  return (
    <form css={form}>
      <legend css={legend}>Factura</legend>
      <fieldset css={fieldset}>
        <label css={label}>
          Número de factura
          <input
            autoFocus
            id="number"
            name="number"
            type="text"
            css={input}
            defaultValue={state.invoice.number}
            onChange={actions.theme.handleChange}
          />
        </label>
        <div css={inner}>
          <label css={label}>
            Fecha de emisión
            <input
              id="dates-issued"
              name="dates-issued"
              type="text"
              placeholder="DD/MM/YYYY"
              css={datesInput}
              defaultValue={state.invoice.dates.issued}
              onChange={actions.theme.handleChange}
            />
          </label>
          <label css={label}>
            Fecha de vencimiento
            <input
              id="dates-expires"
              name="dates-expires"
              type="text"
              placeholder="DD/MM/YYYY"
              css={datesInput}
              defaultValue={state.invoice.dates.expires}
              onChange={actions.theme.handleChange}
            />
          </label>
        </div>
      </fieldset>
      {[
        ["provider", "Proveedor"],
        ["client", "Cliente"],
      ].map(([slug, name]) => (
        <Fragment key={slug}>
          <legend css={legend}>{name}</legend>
          <fieldset key={slug} css={fieldset}>
            <label css={label}>
              Nombre
              <input
                id={`${slug}-name`}
                name={`${slug}-name`}
                type="text"
                css={input}
                defaultValue={state.invoice[slug].name}
                onChange={actions.theme.handleChange}
              />
            </label>
            <label css={label}>
              Identificador fiscal
              <input
                id={`${slug}-identifier`}
                name={`${slug}-identifier`}
                type="text"
                placeholder="NIF / CIF / NOI"
                css={input}
                defaultValue={state.invoice[slug].identifier}
                onChange={actions.theme.handleChange}
              />
            </label>
            <label css={label}>
              Dirección
              <input
                id={`${slug}-address`}
                name={`${slug}-address`}
                type="text"
                css={input}
                defaultValue={state.invoice[slug].address}
                onChange={actions.theme.handleChange}
              />
            </label>
            <label css={label}>
              Código postal
              <input
                id={`${slug}-pc`}
                name={`${slug}-pc`}
                type="text"
                css={input}
                defaultValue={state.invoice[slug].pc}
                onChange={actions.theme.handleChange}
              />
            </label>
            <label css={label}>
              Población
              <input
                id={`${slug}-city`}
                name={`${slug}-city`}
                type="text"
                css={input}
                defaultValue={state.invoice[slug].city}
                onChange={actions.theme.handleChange}
              />
            </label>
            <label css={label}>
              País
              <input
                id={`${slug}-country`}
                name={`${slug}-country`}
                type="text"
                css={input}
                defaultValue={state.invoice[slug].country}
                onChange={actions.theme.handleChange}
              />
            </label>
          </fieldset>
        </Fragment>
      ))}
      <legend css={legendTwo}>Detalles</legend>
      <fieldset css={concepts}>
        {state.invoice.concepts.items.map((item, key, array) => (
          <div css={conceptsInner} key={item.id}>
            <label css={label}>
              <span>Concepto</span>
              <input
                id={`concepts-${key}-concept`}
                name={`concepts-${key}-concept`}
                type="text"
                placeholder="Desarrollo Web"
                css={input}
                defaultValue={item.concept}
                onChange={actions.theme.handleConceptChange}
              />
            </label>
            <label css={label}>
              <span>Cantidad</span>
              <input
                id={`concepts-${key}-quantity`}
                name={`concepts-${key}-quantity`}
                type="text"
                placeholder="120"
                css={numberInput}
                defaultValue={item.quantity}
                onChange={actions.theme.handleConceptChange}
              />
            </label>
            <label css={label}>
              <span>Precio</span>
              <input
                id={`concepts-${key}-price`}
                name={`concepts-${key}-price`}
                type="text"
                placeholder="30.00"
                css={numberInput}
                defaultValue={item.price}
                onChange={actions.theme.handleConceptChange}
              />
            </label>
            <Button
              css={css`
                &:disabled {
                  display: none;
                }
              `}
              aria-label="Eliminar concepto"
              type="button"
              icon={<DeleteIcon />}
              onClick={(event) => actions.theme.deleteConcept(event, item.id)}
              disabled={key === 0 && array.length === 1}
            />
          </div>
        ))}
        <Button
          type="button"
          css={addConcept}
          label="Añadir concepto"
          icon={
            <AddIcon
              css={css`
                margin-left: 8px;
              `}
            />
          }
          onClick={actions.theme.addConcept}
        />
        <div css={taxInner}>
          <label css={checkboxLabel}>
            <input
              id="concepts-has-iva"
              name="concepts-has-iva"
              type="checkbox"
              css={checkboxInput}
              defaultChecked={state.invoice.concepts.hasIva}
              onChange={actions.theme.handleCheckboxChange}
            />
            <span css={checkbox} />
            IVA
          </label>
          {state.invoice.concepts.hasIva && (
            <label>
              <input
                id="concepts-iva"
                name="concepts-iva"
                type="text"
                css={taxInput}
                defaultValue={state.invoice.concepts.iva}
                onChange={actions.theme.handleChange}
              />
              <span css={percentage}>%</span>
            </label>
          )}
        </div>
        <div css={taxInner}>
          <label css={checkboxLabel}>
            <input
              id="concepts-has-irpf"
              name="concepts-has-irpf"
              type="checkbox"
              css={checkboxInput}
              defaultChecked={state.invoice.concepts.hasIrpf}
              onChange={actions.theme.handleCheckboxChange}
            />
            <span css={checkbox} />
            IRPF
          </label>
          {state.invoice.concepts.hasIrpf && (
            <label>
              <input
                id="concepts-irpf"
                name="concepts-irpf"
                type="text"
                css={taxInput}
                defaultValue={state.invoice.concepts.irpf}
                onChange={actions.theme.handleChange}
              />
              <span css={percentage}>%</span>
            </label>
          )}
        </div>
      </fieldset>
      <legend css={legendTwo}>Forma de pago</legend>
      <fieldset css={methodFieldset}>
        <label css={labelSelect}>
          <select
            name="payment-method"
            css={select}
            value={state.invoice.payment.selected}
            onChange={actions.theme.handleSelectChange}
            aria-label="Seleccionar forma de pago"
          >
            {state.invoice.payment.methods.map((method) => (
              <option key={method.slug} value={method.slug}>
                {method.name}
              </option>
            ))}
          </select>
        </label>
        {state.invoice.payment.selected === "transfer" && (
          <>
            <label css={label}>
              Banco
              <input
                id="payment-transfer-swift"
                name="payment-transfer-bank"
                type="text"
                css={input}
                defaultValue={state.invoice.payment.transfer.bank}
                onChange={actions.theme.handleChange}
              />
            </label>
            <label css={label}>
              IBAN
              <input
                id="payment-transfer-iban"
                name="payment-transfer-iban"
                type="text"
                css={input}
                defaultValue={state.invoice.payment.transfer.iban}
                onChange={actions.theme.handleChange}
              />
            </label>
            <label css={label}>
              SWIFT/BIC
              <input
                id="payment-transfer-swift"
                name="payment-transfer-swift"
                type="text"
                css={input}
                defaultValue={state.invoice.payment.transfer.swift}
                onChange={actions.theme.handleChange}
              />
            </label>
          </>
        )}
      </fieldset>
      <legend css={legendTwo}>Notas</legend>
      <fieldset css={fieldset}>
        <textarea
          id="notes"
          name="notes"
          css={textarea}
          defaultValue={state.invoice.notes}
          onChange={actions.theme.handleChange}
          aria-label="Notas"
        />
      </fieldset>
      <legend css={legend}>Logo</legend>
      <fieldset css={fieldsetFile}>
        <label css={labelFile}>
          {state.invoice.logo.filename || "Ningún archivo seleccionado..."}
          <input
            css={inputFile}
            type="file"
            name="logo"
            onChange={actions.theme.handleFileChange}
            accept="image/png, image/jpeg"
          />
          <span css={spanFile}>Seleccionar</span>
        </label>
      </fieldset>
      <legend css={legend}>Plantilla</legend>
      <fieldset css={fieldsetFile}>
        <TemplateSelector />
      </fieldset>
    </form>
  );
};

export default connect(Form, { injectProps: false });
