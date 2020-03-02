var Pagination = function(totalNum, pageSize, currentPage) {
	this.totalNum = totalNum;
	this.pageSize = pageSize;
	this.currentPage = currentPage;
	this.pageCount = function() {
		var num = Math.ceil(totalNum/pageSize);
		return num;
	}
}