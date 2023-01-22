import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import PreviewIcon from "@mui/icons-material/Preview";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { red } from "@mui/material/colors";

export default function LinkListingTable() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const [incomingDate, setincomingDate] = useState([]);

  function click(id, name) {
    const show = (id) => {
      // window.history.replaceState(null,"last", "asset/"+id+"/edit?disabled=true")
      window.location.href = "asset/" + id + "/edit?disabled=true";
    };

    const edit = (id) => {
      // window.history.replaceState(null,"last", "asset/"+id+"/edit?disabled=true")
      window.location.href = "asset/" + id + "/edit";
    };

    const deleted = (id) => {
      const pathUrl = `assets\\${id}`;

      if (window.confirm("Do you really want to delete this asset?")) {
        axios
          .delete(pathUrl)
          .then((response) => {
            // handle success
            console.log("assets deleted");

            load();
          })
          .catch((error) => {
            // handle error
            console.log(error);
          });
      }
    };

    if (name == "Edit") edit(id);
    else if (name == "Visualize") show(id);
    else deleted(id);
  }

  function MenuComponent(id) {
    const op = [
      {
        name: "Visualize",
        img: <PreviewIcon color="primary" />,
      },
      {
        name: "Edit",
        img: <DriveFileRenameOutlineIcon color="success" />,
      },
      {
        name: "Delete",
        img: <DeleteForeverIcon sx={{ color: red[500] }} />,
      },
    ];

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {op.map((option) => (
            <MenuItem
              key={option.name}
              onClick={() => click(id.id, option.name)}
            >
              {option.img}
              {option.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }

  const load = async () => {
    await axios
      .get(`assets?page=${page}&limit=10`)
      .then((response) => {
        // handle success
        setincomingDate([...response.data.data]);
        // setPage()
        setTotalPages(response.data.meta.totalPages);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  React.useEffect(() => {
    load();
  }, [page]);

  return (
    <>
      <Typography variant="h1" component="h2">
        Asset Page
      </Typography>
      <TableContainer component={Paper}>
        <Button href="/asset/create" variant="contained">
          Register
        </Button>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={2} >Titulo</TableCell>
              <TableCell align="left" colSpan={9}>Link</TableCell>
              <TableCell align="left" colSpan={1} >Opcoes</TableCell>
              {/* <TableCell align="left">Adquired Date</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Option</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {incomingDate.map((data) => (
              <TableRow
                key={data.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{data.name}</TableCell>
                <TableCell align="center" component="th" scope="row">
                  {data.quantity}
                </TableCell>
                {/* <TableCell align="left">{data.cost}</TableCell>
                <TableCell align="left">{data.adquiredDate}</TableCell>
                <TableCell align="left">{data.description}</TableCell> */}
                <TableCell align="center">
                  {<MenuComponent id={data.id} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          sx={{ border: "none" }}
          count={totalPages}
          color={"primary"}
          onChange={(e, value) => setPage(value)}
        ></Pagination>
      </div>
    </>
  );
}