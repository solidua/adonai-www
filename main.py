import jinja2
import logging
import os
import webapp2



from google.appengine.api.app_identity import get_application_id

if 'prod' in get_application_id():
  DEBUG = False
else:
  DEBUG = True

JINJA_ENVIRONMENT = jinja2.Environment(autoescape=True,
    loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), './webapp/build')))

class MainHandler(webapp2.RequestHandler):
  def get(self, page):
    if page == '':
      template = 'index'
      # utility.handy.get_all_logs()
    else:
      template = page

    template = '%s.html' % template
    try:
      jinja_template = JINJA_ENVIRONMENT.get_template(template)
      template_values = {'page': page}
      self.response.write(jinja_template.render(template_values))
    except jinja2.TemplateNotFound:
      logging.info('template not found: %s', template)
      jinja_template = JINJA_ENVIRONMENT.get_template('not-found.html')
      self.response.write(jinja_template.render())


class RobotsHandler(webapp2.RequestHandler):
  def get(self):
    self.response.clear()
    self.response.headers['Content-Type'] = 'text/plain'
    if 'prod' in get_application_id():
      template = 'robots-prod.txt'
    else:
      template = 'robots-test.txt'
    template_values = {}
    jinja_template = JINJA_ENVIRONMENT.get_template(template)
    self.response.write(jinja_template.render(template_values))


application = webapp2.WSGIApplication([
  webapp2.Route('/robots.txt', handler=RobotsHandler),
  webapp2.Route('/<page:(.*)>', handler=MainHandler)
  ], debug=True)
