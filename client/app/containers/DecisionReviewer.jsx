import React, { PropTypes } from 'react';
import PdfViewer from '../components/PdfViewer';
import PdfListView from '../components/PdfListView';
import PDFJSAnnotate from 'pdf-annotate.js';
import AnnotationStorage from '../util/AnnotationStorage';

export default class DecisionReviewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: 'sortByDate',
      filterBy: '',
      sortDirection: 'ascending',
      listView: true,
      pdf: null
    };

    this.state.documents = this.filterDocuments(this.sortDocuments(this.props.appealDocuments));

    this.annotationStorage = new AnnotationStorage(this.props.annotations);
    PDFJSAnnotate.setStoreAdapter(this.annotationStorage);
  }

  previousPdf = () => {
    this.setState({
      pdf: Math.max(this.state.pdf - 1, 0)
    });
  }

  nextPdf = () => {
    this.setState({
      pdf: Math.min(this.state.pdf + 1, this.state.documents.length - 1)
    });
  }

  showPdf = (pdfNumber) => () => {
    this.setState({
      pdf: pdfNumber
    })
  }

  showList = () => {
    this.setState({
      pdf: null
    });
  }

  sortAndFilter = () => {
    this.setState({
      documents: this.filterDocuments(
        this.sortDocuments(this.props.appealDocuments))
    });
  }

  sortDocuments = (documents) => {
    let documentCopy = [...documents];
    let multiplier;
    if (this.state.sortDirection === 'ascending') {
      multiplier = 1;
    } else if (this.state.sortDirection === 'descending') {
      multiplier = -1;
    } else {
      return;
    }

    documentCopy.sort((doc1, doc2) => {
      if (this.state.sortBy === 'sortByDate') {
        return multiplier * (new Date(doc1.received_at) - new Date(doc2.received_at));
      }
      if (this.state.sortBy === 'sortByType') {
        return multiplier * ((doc1.type < doc2.type) ? -1 : 1);
      }
      if (this.state.sortBy === 'sortByFilename') {
        return multiplier * ((doc1.filename < doc2.filename) ? -1 : 1);
      }
    });

    return documentCopy;
  }

  changeSortState = (sortBy) => () => {
    let sortDirection = this.state.sortDirection;

    if (this.state.sortBy === sortBy) {
      if (sortDirection === 'ascending') {
        sortDirection = 'descending';
      } else {
        sortDirection = 'ascending';
      }
    } else {
      sortDirection = 'ascending';
    }

    this.setState({
      sortBy: sortBy,
      sortDirection: sortDirection
    }, this.sortAndFilter);
  }

  filterDocuments = (documents) => {
    let filterBy = this.state.filterBy.toLowerCase();
    let filteredDocuments = documents.filter((doc) => {
      if (doc.type.toLowerCase().includes(filterBy)) {
        return true;
      } else if (doc.filename.toLowerCase().includes(filterBy)) {
        return true;
      } else if (doc.received_at.toLowerCase().includes(filterBy)) {
        return true;
      } else {
        let comments = this.annotationStorage.getAnnotationByDocumentId(doc.id).reduce((combined, comment) => {
          return combined + ' ' + comment.comment.toLowerCase();
        }, '');
        if (comments.includes(filterBy)) {
          return true; 
        } else {
          return false;
        }
      }
    });

    return filteredDocuments;
  }

  onFilter = (filterBy) => {
    this.setState({
      filterBy: filterBy
    }, this.sortAndFilter);
  }

  render() {
    let { 
      documents,
      sortDirection,
    } = this.state;

    return (
      <div>
        {this.state.pdf === null && <PdfListView
          annotationStorage={this.annotationStorage}
          documents={documents}
          changeSortState={this.changeSortState}
          showPdf={this.showPdf}
          sortDirection={sortDirection}
          numberOfDocuments={this.props.appealDocuments.length}
          onFilter={this.onFilter}
          filterBy={this.state.filterBy}
          sortBy={this.state.sortBy} />}
        {this.state.pdf !== null && <PdfViewer
          annotationStorage={this.annotationStorage}
          file={`review/pdf?vbms_document_id=` +
            `${documents[this.state.pdf].vbms_document_id}`}
          receivedAt={documents[this.state.pdf].received_at}
          type={documents[this.state.pdf].type}
          name={documents[this.state.pdf].filename}
          previousPdf={this.previousPdf}
          nextPdf={this.nextPdf}
          showList={this.showList}
          pdfWorker={this.props.pdfWorker}
          id={documents[this.state.pdf].id} />}
      </div>
    );
  }
}

DecisionReviewer.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object),
  appealDocuments: PropTypes.arrayOf(PropTypes.object).isRequired,
  pdfWorker: PropTypes.string
};
