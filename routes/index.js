
/*
 * GET home page.
 */

exports.index = function(req, res){
  var ua = req.header('user-agent');
  if(/mobile/i.test(ua)) {
    res.render('mobile_index', { title: 'Activity Explorer - Experience More', layout: 'mobile_layout' });
  } 
  else if (/android/i.test(ua)) {
    res.render('desktop_index', { title: 'Activity Explorer - Experience More', layout: 'desktop_layout' });
  }
  else {
    res.render('desktop_index', { title: 'Activity Explorer - Experience More', layout: 'desktop_layout' });
  }
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};