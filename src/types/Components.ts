// Form
export type FormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>
  children: React.ReactNode
  reset?: () => void
  submitButtonText?: string
}
