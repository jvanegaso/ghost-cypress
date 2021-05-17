(function () {
  console.log(report);
  const features = report.features;

  function renderFeatureMenu() {
    const featureMenu = $('#div-features');
    features.forEach((feature, index) => {
      const link = $('<a>').attr({
        'data-feature': index,
        href: '#'
      }).text(feature.name);
      link.on('click', onFeatureClick);
      featureMenu.append(link);
    });
  }

  function onFeatureClick(event) {
    const index = event.currentTarget.attributes['data-feature'].value;
    const feature = features[index];
    console.log(feature);
    $('#feature-title').text(feature.name);
    $('#feature-scenarios-count').text(`Scenarios: ${feature.scenarios.length}`);
    $('#feature-details').html('').append(renderFeatureDetails(feature, index));
  }

  function renderFeatureDetails(feature, index) {
    const wrapper = $('<div>');
    feature.scenarios.forEach((scenario, index) => {
      wrapper.append(renderScenario(scenario, index));
    });
    return wrapper;
  }

  function renderScenario(scenario, index) {
    const wrapper = $('<div>');
    const title = $('<h6>').text(scenario.name);
    wrapper.append(title);
    wrapper.append(renderSteps(scenario.steps));
    wrapper.append($('<hr/>'));
    return wrapper;
  }

  function renderSteps(steps) {
    const wrapper = $('<div>');
    wrapper.append($('<p>').text(`Total Steps ${steps.length}`));
    steps.forEach(step => {
      wrapper.append(renderStep(step));
    });
    return wrapper;
  }

  function cutPath(url) {
    return '.' + url.substring(url.indexOf(report.reportId)).replace(report.reportId, '')
  }

  function renderStep(step) {
    const wrapper = $('<div class="pl-2">');
    const comparsion = step.comparison;
    wrapper.append(`<p>Step: <b>${step.name} :: Has Comparison ${step.hasComparison}</b></p>`);

    if (step.hasComparison) {
      const v1Img = cutPath(step.versions[0].img);
      wrapper.append(renderImage(v1Img, 'Version 3.3.0'));
  
      const v2Img = cutPath(step.versions[1].img);
      wrapper.append(renderImage(v2Img, 'Version 3.45.2'));
  
      const comparisonUrl = cutPath(step.comparisonImage);
      wrapper.append(renderImage(comparisonUrl, 'Diff'));
  
      wrapper.append(renderComparisonTable(step));
    }
    
    wrapper.append(`<hr/>`);
    return wrapper;
  }

  function renderImage(url, body) {
    const link = $('<a>');
    const card = $('<div class="card step-card">');

    link.attr({
      href: url,
      target: '_blank',
    });
    card.append($('<img>').attr({
      src: url,
      width: 350,
      class: 'step-image'
    }));

    card.append(`
      <div class="card-body">
        <p class="card-text">${body}</p>
      </div>
    `);

    link.append(card);
    return link;
  }

  function renderComparisonTable(step) {
    const c = step.comparisonData;
    const misMatch = c.rawMisMatchPercentage;
    const hasDiff = misMatch > 0;

    const rowStyle = hasDiff ? 'table-danger' : 'table-success';

    return `
    <div class="text-center mt-4 pl-3">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Same Dimensions</th>
            <th>Size Diff</th>
            <th>Mismatch %</th>
            <th>Bounds Diff</th>
            <th>Analysis Time</th>
          </tr>
        </thead>
        <tbody>
          <tr class="${rowStyle}">
            <td>${c.isSameDimensions}</td>
            <td>${JSON.stringify(c.dimensionDifference)}</td>
            <td>${c.misMatchPercentage}%</td>
            <td>${JSON.stringify(c.diffBounds)}</td>
            <td>${c.analysisTime}</td>
          </tr>
        </tbody>
      </table>
    </div>
    `;
  }

  function init() {
    renderFeatureMenu();
    $('#div-features a:first').click();
  }

  init();
})();