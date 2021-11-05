import React from "react";
import { css, connect, useConnect } from "frontity";
import Button from "../button";
import AddIcon from "../icons/add";
import DeleteIcon from "../icons/delete";
import Fieldset from "./fieldset";
import Input from "./input";
import Checkbox from "./checkbox";
import Select from "./select";
import Textarea from "./textarea";
import FileInput from "./file-input";
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

  const inner = css`
    display: grid;
    grid-row-gap: 16px;
  `;

  const taxInput = css`
    width: 50px;
    text-align: center;
    margin: 0;
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

  return (
    <form css={form}>
      <Fieldset legend="Factura" layout="two-thirds">
        <Input
          name="number"
          type="text"
          label="Número de factura"
          defaultValue={state.invoice.number}
          onChange={actions.theme.handleChange}
        />
        <div css={inner}>
          <Input
            name="dates-issued"
            type="text"
            label="Fecha de emisión"
            placeholder="DD/MM/YYYY"
            align="center"
            defaultValue={state.invoice.dates.issued}
            onChange={actions.theme.handleChange}
          />
          <Input
            name="dates-expires"
            type="text"
            label="Fecha de vencimiento"
            placeholder="DD/MM/YYYY"
            align="center"
            defaultValue={state.invoice.dates.expires}
            onChange={actions.theme.handleChange}
          />
        </div>
      </Fieldset>
      {[
        ["provider", "Proveedor"],
        ["client", "Cliente"],
      ].map(([slug, name]) => (
        <Fieldset key={slug} legend={name} layout="two-thirds">
          <Input
            name={`${slug}-name`}
            type="text"
            label="Nombre"
            defaultValue={state.invoice[slug].name}
            onChange={actions.theme.handleChange}
          />
          <Input
            name={`${slug}-identifier`}
            type="text"
            label="Identificador fiscal"
            placeholder="NIF / CIF / NOI"
            defaultValue={state.invoice[slug].identifier}
            onChange={actions.theme.handleChange}
          />
          <Input
            name={`${slug}-address`}
            type="text"
            label="Dirección"
            defaultValue={state.invoice[slug].address}
            onChange={actions.theme.handleChange}
          />
          <Input
            name={`${slug}-pc`}
            type="text"
            label="Código postal"
            defaultValue={state.invoice[slug].pc}
            onChange={actions.theme.handleChange}
          />
          <Input
            name={`${slug}-city`}
            type="text"
            label="Población"
            defaultValue={state.invoice[slug].city}
            onChange={actions.theme.handleChange}
          />
          <Input
            name={`${slug}-country`}
            type="text"
            label="País"
            defaultValue={state.invoice[slug].country}
            onChange={actions.theme.handleChange}
          />
        </Fieldset>
      ))}
      <Fieldset legend="Detalles" layout="half">
        {state.invoice.concepts.items.map((item, key, array) => (
          <div css={conceptsInner} key={item.id}>
            <Input
              name={`concepts-${key}-concept`}
              type="text"
              label="Concepto"
              placeholder="Desarrollo Web"
              defaultValue={item.concept}
              onChange={actions.theme.handleConceptChange}
            />
            <Input
              name={`concepts-${key}-quantity`}
              type="text"
              label="Cantidad"
              placeholder="120"
              align="right"
              defaultValue={item.quantity}
              onChange={actions.theme.handleConceptChange}
            />
            <Input
              name={`concepts-${key}-price`}
              type="text"
              label="Precio"
              placeholder="30.00"
              align="right"
              defaultValue={item.price}
              onChange={actions.theme.handleConceptChange}
            />
            <Button
              label="Eliminar concepto"
              hideLabel
              icon={<DeleteIcon />}
              onClick={(event) => actions.theme.deleteConcept(event, item.id)}
              disabled={key === 0 && array.length === 1}
            />
          </div>
        ))}
        <Button
          css={addConcept}
          label="Añadir concepto"
          icon={<AddIcon />}
          onClick={actions.theme.addConcept}
        />
        <div css={taxInner}>
          <Checkbox
            name="concepts-has-iva"
            type="checkbox"
            label="IVA"
            defaultChecked={state.invoice.concepts.hasIva}
            onChange={actions.theme.handleCheckboxChange}
          />
          {state.invoice.concepts.hasIva && (
            <Input
              name="concepts-iva"
              type="text"
              layout="row-reverse"
              label="%"
              css={taxInput}
              defaultValue={state.invoice.concepts.iva}
              onChange={actions.theme.handleChange}
            />
          )}
        </div>
        <div css={taxInner}>
          <Checkbox
            name="concepts-has-irpf"
            type="checkbox"
            label="IRPF"
            defaultChecked={state.invoice.concepts.hasIrpf}
            onChange={actions.theme.handleCheckboxChange}
          />
          {state.invoice.concepts.hasIrpf && (
            <Input
              name="concepts-irpf"
              type="text"
              layout="row-reverse"
              label="%"
              css={taxInput}
              defaultValue={state.invoice.concepts.irpf}
              onChange={actions.theme.handleChange}
            />
          )}
        </div>
      </Fieldset>
      <Fieldset legend="Forma de pago" layout="method">
        <Select
          name="payment-method"
          label="Seleccionar forma de pago"
          hideLabel
          value={state.invoice.payment.selected}
          onChange={actions.theme.handleSelectChange}
        >
          {state.invoice.payment.methods.map((method) => (
            <option key={method.slug} value={method.slug}>
              {method.name}
            </option>
          ))}
        </Select>
        {state.invoice.payment.selected === "transfer" && (
          <>
            <Input
              name="payment-transfer-bank"
              type="text"
              label="Banco"
              defaultValue={state.invoice.payment.transfer.bank}
              onChange={actions.theme.handleChange}
            />
            <Input
              name="payment-transfer-iban"
              type="text"
              label="IBAN"
              defaultValue={state.invoice.payment.transfer.iban}
              onChange={actions.theme.handleChange}
            />
            <Input
              name="payment-transfer-swift"
              type="text"
              label="SWIFT/BIC"
              defaultValue={state.invoice.payment.transfer.swift}
              onChange={actions.theme.handleChange}
            />
          </>
        )}
      </Fieldset>
      <Fieldset legend="Notas">
        <Textarea
          name="notes"
          label="Notas"
          hideLabel
          defaultValue={state.invoice.notes}
          onChange={actions.theme.handleChange}
        />
      </Fieldset>
      <Fieldset legend="Logo">
        <FileInput
          name="logo"
          accept="image/png, image/jpeg"
          filename={state.invoice.logo.filename}
          onChange={actions.theme.handleFileChange}
        />
      </Fieldset>
      <Fieldset legend="Plantilla">
        <Select
          name="template-design"
          label="Seleccionar plantilla"
          hideLabel
          value={state.invoice.template.selected}
          onChange={actions.theme.handleSelectChange}
        >
          {state.invoice.template.designs.map((design) => (
            <option key={design.slug} value={design.slug}>
              {design.name}
            </option>
          ))}
        </Select>
      </Fieldset>
      <Fieldset legend="Idioma">
        <Select
          name="language"
          label="Seleccionar idioma"
          hideLabel
          value={state.invoice.language.selected}
          onChange={actions.theme.handleSelectChange}
        >
          {state.invoice.language.languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </Select>
      </Fieldset>
      <Fieldset legend="Divisa">
        <Select
          name="currency"
          label="Seleccionar divisa"
          hideLabel
          value={state.invoice.currency.selected}
          onChange={actions.theme.handleSelectChange}
        >
          {state.invoice.currency.currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </Select>
      </Fieldset>
    </form>
  );
};

export default connect(Form, { injectProps: false });
