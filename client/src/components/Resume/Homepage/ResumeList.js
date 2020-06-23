import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import { withStyles } from '@material-ui/styles';
import AddBox from '@material-ui/icons/AddBox';
import FileCopy from '@material-ui/icons/FileCopy';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import Container from '@material-ui/core/Container';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Divider from '@material-ui/core/Divider';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { toast } from 'react-toastify';

const styles = theme => ({
	section: {
		flex: '1 1 auto'
	},
	content: {
		width: '100%',
		marginTop: '80px',
		padding: theme.spacing(1),
		boxSizing: 'border-box',
		marginBottom: theme.spacing(3)
	},
	title: {
		fontWeight: 'bold'
	},
	divider: {
		margin: theme.spacing(3, 0)
	}
});

class ResumeList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{ title: 'Resume Title', field: 'name' },
				{ title: 'Job Position', field: 'job_position' },
				{ title: 'Updated At', field: 'updated_at', editable: 'never' },
				{ title: 'Created At', field: 'created_at', editable: 'never' },
			],
			data: []
		}

	}

	static getDerivedStateFromProps(props, state) {
		if (!props.auth || !props.auth.isAuthenticated) {
			toast.info('Please login first.');
			props.history.push('/login')
		}
		return null;
	}

	render() {
		const { classes, history, auth } = this.props;
		const tableIcons = {
			Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
			Clone: forwardRef((props, ref) => <FileCopy {...props} ref={ref} />),
			Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
			Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
			Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
			DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
			Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
			Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
			Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
			FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
			LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
			NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
			PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
			ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
			Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
			SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
			ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
			ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
		};

		const tableRef = React.createRef();

		return (
			<div className={classes.section}>
				<Container className={classes.content} maxWidth="md">
					<Typography variant="h4" align="left" className={classes.title} gutterBottom>
						My Resume
                </Typography>
					<Divider variant="fullWidth" className={classes.divider} />
					<MaterialTable
						tableRef={tableRef}
						icons={tableIcons}
						title="Resume List"
						columns={this.state.columns}
						localization={
							{
								body: {
									editRow: {
										deleteText: 'Are you sure you want to delete this resume?'
									}
								}
							}
						}
						data={query => new Promise((resolve, reject) => {
							fetch(`${process.env.REACT_APP_WEB_API_URL}/resume?per_page=${query.pageSize}&page=${query.page + 1}`, {
								headers: {
									'Authorization': `Bearer ${auth.token}`
								}
							})
								.then(res => res.json())
								.then((result) => {
									result = JSON.parse(result);
									resolve({
										data: result.resumes,
										page: result.page - 1,
										totalCount: result.total
									})
								});

						})}
						actions={[
							{
								icon: tableIcons.Add,
								tooltip: 'Add Resume',
								isFreeAction: true,
								onClick: (event) => history.push('/resume/edit')
							},
							{
								icon: tableIcons.Clone,
								tooltip: 'Clone Resume',
								onClick: (event, rowData) => {
									fetch(`${process.env.REACT_APP_WEB_API_URL}/resumeClone?id=${rowData.id}`)
										.then(response => {
											tableRef.current.onQueryChange()
										})
								}
							},
							{
								icon: tableIcons.Edit,
								tooltip: 'Edit Resume',
								onClick: (event, rowData) => history.push(`/resume/${rowData.id}/edit/step2`)
							},
							{
								icon: tableIcons.Export,
								tooltip: 'Export Resume',
								onClick: (event, rowData) => history.push(`/builder/${rowData.id}`)
							},
						]}
						options={{
							actionsColumnIndex: -1
						}}
						editable={{
							onRowDelete: oldData =>
								new Promise((resolve, reject) => {
									fetch(`${process.env.REACT_APP_WEB_API_URL}/resume?id=${oldData.id}`, {
										method: 'DELETE',
										headers: {
											'Authorization': `Bearer ${auth.token}`
										}
									})
										.then(res => res.json())
										.then((result) => {
											resolve()
										});
								}),
						}}
					/>
				</Container>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(withRouter(withStyles(styles)(ResumeList)));