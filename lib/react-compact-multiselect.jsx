var React = require("react/addons");
var DropButton = require("react-drop-button");
var DropTrigger = DropButton.DropTrigger;
var DropBoxContent = DropButton.DropBoxContent;
var FilteredChecklist = require("./components/filtered-checklist.jsx");
require("./react-compact-multiselect.scss");

var ALIGN_CONTENT_SE = DropButton.ALIGN_CONTENT_SE;
var ALIGN_CONTENT_NE = DropButton.ALIGN_CONTENT_NE;
var ALIGN_CONTENT_SW = DropButton.ALIGN_CONTENT_SW;
var ALIGN_CONTENT_NW = DropButton.ALIGN_CONTENT_NW;


var ReactCompactMultiselect = React.createClass({
  statics: {
    ALIGN_CONTENT_SE: ALIGN_CONTENT_SE,
    ALIGN_CONTENT_NE: ALIGN_CONTENT_NE,
    ALIGN_CONTENT_SW: ALIGN_CONTENT_SW,
    ALIGN_CONTENT_NW: ALIGN_CONTENT_NW
  },
  propTypes: {
    label: React.PropTypes.string,
    options: React.PropTypes.array,
    initialValue: React.PropTypes.array,
    layoutMode: React.PropTypes.string,
    groupBy: React.PropTypes.string,
    onChange: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {layoutMode: ALIGN_CONTENT_SE};
  },
  getInitialState: function() {
    return {value: [], filterValue: ''};
  },
  componentWillMount: function() {
    this.setState({value: this.props.initialValue});
  },
  handleCheckToggle: function(optionValue) {
    var newValueState = this.state.value.slice(0);
    var valueIndex = newValueState.indexOf(optionValue);
    if(valueIndex > -1){
        newValueState.splice(valueIndex,1);
    } else {
        newValueState.push(optionValue);
    }

    this.fireValueChange(newValueState);
  },
  selectAll: function() {
    var allValues = this.props.options.map(function(opt) {return opt.value;});
    this.fireValueChange(allValues);
  },
  deselectAll: function() {
    this.fireValueChange([]);
  },
  fireValueChange: function(newValueState) {
    //value can change from the check boxes, or from the select all type buttons
    //make sure state gets propogated above and below
    this.props.onChange(newValueState);
    this.setState({value: newValueState});
  },
  filterValueChange: function(inputValue, callBack) {
    this.setState({filterValue: inputValue}, callBack);
  },
  doneSelecting: function() {
    //Call internal DropButton function to close the drop down
    this.refs.DropButton.toggleDropBox();
  },
  render: function() {
    var selectedCount, label;
    selectedCount = (<span className="rcm-selected-count">{this.state.value.length}</span>);
    if(this.state.value.length === 0)
      selectedCount = "";

    label = (<span className="rcm-label">{this.props.label}</span>);

    return (
      <div className="react-compact-multiselect">
        <DropButton layoutMode={this.props.layoutMode} ref="DropButton">
          <DropTrigger>{label} {selectedCount} </DropTrigger>
          <DropBoxContent>
            <div className="fluid-layout">
              <FilteredChecklist 
                ref="FilteredCheckList"
                options={this.props.options}
                groupBy={this.props.groupBy}
                onChange={this.handleCheckToggle}
                onFilterValueChange={this.filterValueChange}
                value={this.state.value}
                filterValue={this.state.filterValue} />
              <div className="footer">
                <div className="rcm-menu">
                  <button ref="rcm-select-all" className="select-all" name="select-all" onClick={this.selectAll}><span>Select All</span></button>
                  <button ref="rcm-deselect-all" className="deselect-all" name="deselect-all" onClick={this.deselectAll}><span>Deselect All</span></button>
                  <button ref="rcm-done" className="done-selecting-button" name="done" onClick={this.doneSelecting}>Done</button>
                </div>
              </div>
            </div>
          </DropBoxContent>
        </DropButton>
      </div>
    );
  }
});

module.exports = ReactCompactMultiselect;
