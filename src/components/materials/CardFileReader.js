import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
const pdfjs = require("pdfjs-dist");
pdfjs.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry.js");

function CardFileReader(props) {

	const { file }	= props

	console.log(file)

	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	const handleNext = () => {
		if (pageNumber < numPages) {
			setPageNumber(pageNumber + 1)
		}
	}

	const handlePrevious = () => {
		if (pageNumber > 1) {
			setPageNumber(pageNumber - 1)
		}
	}

	return (
		<div id="ResumeContainer">
			<Document
				file={file}
				onLoadSuccess={onDocumentLoadSuccess}
				className={"PDFDocument"}
			>
				<Page className={"PDFPage PDFPageOne"} pageIndex={1} pageNumber={pageNumber} loading={<p>Loading</p>} width={750}/>
			</Document>
			<div className="form-inline">
				<p className="mr-auto">Page {pageNumber} of {numPages}
				<IconButton id="button" onClick={handlePrevious} style={{marginLeft:"10px"}}>
                  <ArrowBackIosIcon fontSize="large"/>
                </IconButton>
                <IconButton id="button" onClick={handleNext}>
               	  <ArrowForwardIosIcon fontSize="large"/>
                </IconButton>
				</p>
			</div>
		</div>
	);
}

export default CardFileReader;