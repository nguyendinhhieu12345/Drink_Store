import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

interface ITableConfirmDelete {
  open: boolean;
  handleOpen: () => void;
  title: string;
  handleDelete: () => void;
}

function TableConfirmDelete(props: ITableConfirmDelete) {
  return (
    <Dialog placeholder="" open={props.open} handler={props.handleOpen}>
      <DialogHeader placeholder="">Confirm delete {props.title}</DialogHeader>
      <DialogBody placeholder="">
        Are you sure you want to delete this {props.title.toLowerCase()}? This
        action cannot be undone.
      </DialogBody>
      <DialogFooter placeholder="">
        <Button
          placeholder=""
          variant="text"
          color="red"
          onClick={props.handleOpen}
          className="mr-1 cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          onClick={props.handleDelete}
          placeholder=""
          variant="gradient"
          color="green"
          className="cursor-pointer"
        >
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default TableConfirmDelete;
