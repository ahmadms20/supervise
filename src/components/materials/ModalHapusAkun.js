import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';

function ModalHapusAkun({show, onShow, onSubmit, nip}) {

    return(
        <>
        {/* Modal hapus akun */}
            <Dialog onClose={() => onShow()} aria-labelledby="customized-dialog-title" open={show} fullWidth>
                <DialogTitle id="customized-dialog-title" onClose={() => onShow()}>
                  Hapus Data Akun
                </DialogTitle>
                <DialogContent dividers>
                    <p style={{fontSize:"17px"}}>Apakah anda ingin menghapus data?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>onSubmit(nip)} id="button" color="secondary">Ya</Button>
                    <Button onClick={() => onShow()} id="button" color="primary">Batal</Button>
                </DialogActions>
            </Dialog>
        {/* Modal hapus akun */}
        </>
    )
}

export default ModalHapusAkun;