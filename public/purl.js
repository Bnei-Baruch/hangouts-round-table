  


<!DOCTYPE html>
<html>
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# githubog: http://ogp.me/ns/fb/githubog#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>jQuery-URL-Parser/purl.js at master · allmarkedup/jQuery-URL-Parser · GitHub</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png" />
    <link rel="logo" type="image/svg" href="http://github-media-downloads.s3.amazonaws.com/github-logo.svg" />
    <link rel="xhr-socket" href="/_sockets" />
    


    <meta name="msapplication-TileImage" content="/windows-tile.png" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="selected-link" value="repo_source" data-pjax-transient />
    <meta content="collector.githubapp.com" name="octolytics-host" /><meta content="github" name="octolytics-app-id" />

    
    
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    <meta content="authenticity_token" name="csrf-param" />
<meta content="h0lHcJM6f5nzJaWuqc2BCa2hIaz9rMnNdK7UlLCGJ4U=" name="csrf-token" />

    <link href="https://a248.e.akamai.net/assets.github.com/assets/github-2e53882cf8306e277ea0d07dbb6117f926c38f6c.css" media="all" rel="stylesheet" type="text/css" />
    <link href="https://a248.e.akamai.net/assets.github.com/assets/github2-8ea4ea72d7b478cc437d5b2e6841998ad79f1396.css" media="all" rel="stylesheet" type="text/css" />
    


      <script src="https://a248.e.akamai.net/assets.github.com/assets/frameworks-5c60c478b1e0f90d149f11ed15aa52edd2996882.js" type="text/javascript"></script>
      <script src="https://a248.e.akamai.net/assets.github.com/assets/github-30e75eead7a0b9c0c4bf82707cbb7e5ab8958275.js" type="text/javascript"></script>
      
      <meta http-equiv="x-pjax-version" content="826cbddbd868f774d2e661bb4f461de5">

        <link data-pjax-transient rel='permalink' href='/allmarkedup/jQuery-URL-Parser/blob/0a9ed66d976d4923b68ad60fa4a439822177bafd/purl.js'>
    <meta property="og:title" content="jQuery-URL-Parser"/>
    <meta property="og:type" content="githubog:gitrepository"/>
    <meta property="og:url" content="https://github.com/allmarkedup/jQuery-URL-Parser"/>
    <meta property="og:image" content="https://secure.gravatar.com/avatar/5bb96a234115b3deb5ce3c626998a6f3?s=420&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"/>
    <meta property="og:site_name" content="GitHub"/>
    <meta property="og:description" content="jQuery-URL-Parser - A JS utility for for parsing URLs and extracting information out of them."/>
    <meta property="twitter:card" content="summary"/>
    <meta property="twitter:site" content="@GitHub">
    <meta property="twitter:title" content="allmarkedup/jQuery-URL-Parser"/>

    <meta name="description" content="jQuery-URL-Parser - A JS utility for for parsing URLs and extracting information out of them." />


    <meta content="126726" name="octolytics-dimension-user_id" /><meta content="allmarkedup" name="octolytics-dimension-user_login" /><meta content="854624" name="octolytics-dimension-repository_id" /><meta content="allmarkedup/jQuery-URL-Parser" name="octolytics-dimension-repository_nwo" /><meta content="true" name="octolytics-dimension-repository_public" /><meta content="false" name="octolytics-dimension-repository_is_fork" /><meta content="854624" name="octolytics-dimension-repository_network_root_id" /><meta content="allmarkedup/jQuery-URL-Parser" name="octolytics-dimension-repository_network_root_nwo" />
  <link href="https://github.com/allmarkedup/jQuery-URL-Parser/commits/master.atom" rel="alternate" title="Recent Commits to jQuery-URL-Parser:master" type="application/atom+xml" />

  </head>


  <body class="logged_out page-blob  vis-public env-production  ">
    <div id="wrapper">

      
      
      

      
      <div class="header header-logged-out">
  <div class="container clearfix">

    <a class="header-logo-wordmark" href="https://github.com/">Github</a>

    <div class="header-actions">
      <a class="button primary" href="/signup">Sign up</a>
      <a class="button" href="/login?return_to=%2Fallmarkedup%2FjQuery-URL-Parser%2Fblob%2Fmaster%2Fpurl.js">Sign in</a>
    </div>

    <div class="command-bar js-command-bar  in-repository">


      <ul class="top-nav">
          <li class="explore"><a href="/explore">Explore</a></li>
        <li class="features"><a href="/features">Features</a></li>
          <li class="enterprise"><a href="http://enterprise.github.com/">Enterprise</a></li>
          <li class="blog"><a href="/blog">Blog</a></li>
      </ul>
        <form accept-charset="UTF-8" action="/search" class="command-bar-form" id="top_search_form" method="get">
  <a href="/search/advanced" class="advanced-search-icon tooltipped downwards command-bar-search" id="advanced_search" title="Advanced search"><span class="octicon octicon-gear "></span></a>

  <input type="text" data-hotkey="/ s" name="q" id="js-command-bar-field" placeholder="Search or type a command" tabindex="1" autocapitalize="off"
    
      data-repo="allmarkedup/jQuery-URL-Parser"
      data-branch="master"
      data-sha="8d90df5e3310f1b8551109147a9653547b33ee6d"
  >

    <input type="hidden" name="nwo" value="allmarkedup/jQuery-URL-Parser" />

    <div class="select-menu js-menu-container js-select-menu search-context-select-menu">
      <span class="minibutton select-menu-button js-menu-target">
        <span class="js-select-button">This repository</span>
      </span>

      <div class="select-menu-modal-holder js-menu-content js-navigation-container">
        <div class="select-menu-modal">

          <div class="select-menu-item js-navigation-item selected">
            <span class="select-menu-item-icon octicon octicon-check"></span>
            <input type="radio" class="js-search-this-repository" name="search_target" value="repository" checked="checked" />
            <div class="select-menu-item-text js-select-button-text">This repository</div>
          </div> <!-- /.select-menu-item -->

          <div class="select-menu-item js-navigation-item">
            <span class="select-menu-item-icon octicon octicon-check"></span>
            <input type="radio" name="search_target" value="global" />
            <div class="select-menu-item-text js-select-button-text">All repositories</div>
          </div> <!-- /.select-menu-item -->

        </div>
      </div>
    </div>

  <span class="octicon help tooltipped downwards" title="Show command bar help">
    <span class="octicon octicon-question"></span>
  </span>


  <input type="hidden" name="ref" value="cmdform">

  <div class="divider-vertical"></div>

</form>
    </div>

  </div>
</div>


      


            <div class="site hfeed" itemscope itemtype="http://schema.org/WebPage">
      <div class="hentry">
        
        <div class="pagehead repohead instapaper_ignore readability-menu ">
          <div class="container">
            <div class="title-actions-bar">
              

<ul class="pagehead-actions">



    <li>
      <a href="/login?return_to=%2Fallmarkedup%2FjQuery-URL-Parser"
        class="minibutton js-toggler-target star-button entice tooltipped upwards"
        title="You must be signed in to use this feature" rel="nofollow">
        <span class="octicon octicon-star"></span>Star
      </a>
      <a class="social-count js-social-count" href="/allmarkedup/jQuery-URL-Parser/stargazers">
        995
      </a>
    </li>
    <li>
      <a href="/login?return_to=%2Fallmarkedup%2FjQuery-URL-Parser"
        class="minibutton js-toggler-target fork-button entice tooltipped upwards"
        title="You must be signed in to fork a repository" rel="nofollow">
        <span class="octicon octicon-git-branch"></span>Fork
      </a>
      <a href="/allmarkedup/jQuery-URL-Parser/network" class="social-count">
        206
      </a>
    </li>
</ul>

              <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public">
                <span class="repo-label"><span>public</span></span>
                <span class="mega-octicon octicon-repo"></span>
                <span class="author vcard">
                  <a href="/allmarkedup" class="url fn" itemprop="url" rel="author">
                  <span itemprop="title">allmarkedup</span>
                  </a></span> /
                <strong><a href="/allmarkedup/jQuery-URL-Parser" class="js-current-repository">jQuery-URL-Parser</a></strong>
              </h1>
            </div>

            
  <ul class="tabs">
    <li class="pulse-nav"><a href="/allmarkedup/jQuery-URL-Parser/pulse" class="js-selected-navigation-item " data-selected-links="pulse /allmarkedup/jQuery-URL-Parser/pulse" rel="nofollow"><span class="octicon octicon-pulse"></span></a></li>
    <li><a href="/allmarkedup/jQuery-URL-Parser" class="js-selected-navigation-item selected" data-selected-links="repo_source repo_downloads repo_commits repo_tags repo_branches /allmarkedup/jQuery-URL-Parser">Code</a></li>
    <li><a href="/allmarkedup/jQuery-URL-Parser/network" class="js-selected-navigation-item " data-selected-links="repo_network /allmarkedup/jQuery-URL-Parser/network">Network</a></li>
    <li><a href="/allmarkedup/jQuery-URL-Parser/pulls" class="js-selected-navigation-item " data-selected-links="repo_pulls /allmarkedup/jQuery-URL-Parser/pulls">Pull Requests <span class='counter'>8</span></a></li>

      <li><a href="/allmarkedup/jQuery-URL-Parser/issues" class="js-selected-navigation-item " data-selected-links="repo_issues /allmarkedup/jQuery-URL-Parser/issues">Issues <span class='counter'>22</span></a></li>



    <li><a href="/allmarkedup/jQuery-URL-Parser/graphs" class="js-selected-navigation-item " data-selected-links="repo_graphs repo_contributors /allmarkedup/jQuery-URL-Parser/graphs">Graphs</a></li>


  </ul>
  
<div class="tabnav">

  <span class="tabnav-right">
    <ul class="tabnav-tabs">
          <li><a href="/allmarkedup/jQuery-URL-Parser/tags" class="js-selected-navigation-item tabnav-tab" data-selected-links="repo_tags /allmarkedup/jQuery-URL-Parser/tags">Tags <span class="counter ">4</span></a></li>
    </ul>
  </span>

  <div class="tabnav-widget scope">


    <div class="select-menu js-menu-container js-select-menu js-branch-menu">
      <a class="minibutton select-menu-button js-menu-target" data-hotkey="w" data-ref="master">
        <span class="octicon octicon-branch"></span>
        <i>branch:</i>
        <span class="js-select-button">master</span>
      </a>

      <div class="select-menu-modal-holder js-menu-content js-navigation-container">

        <div class="select-menu-modal">
          <div class="select-menu-header">
            <span class="select-menu-title">Switch branches/tags</span>
            <span class="octicon octicon-remove-close js-menu-close"></span>
          </div> <!-- /.select-menu-header -->

          <div class="select-menu-filters">
            <div class="select-menu-text-filter">
              <input type="text" id="commitish-filter-field" class="js-filterable-field js-navigation-enable" placeholder="Filter branches/tags">
            </div>
            <div class="select-menu-tabs">
              <ul>
                <li class="select-menu-tab">
                  <a href="#" data-tab-filter="branches" class="js-select-menu-tab">Branches</a>
                </li>
                <li class="select-menu-tab">
                  <a href="#" data-tab-filter="tags" class="js-select-menu-tab">Tags</a>
                </li>
              </ul>
            </div><!-- /.select-menu-tabs -->
          </div><!-- /.select-menu-filters -->

          <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket css-truncate" data-tab-filter="branches">

            <div data-filterable-for="commitish-filter-field" data-filterable-type="substring">

                <div class="select-menu-item js-navigation-item selected">
                  <span class="select-menu-item-icon octicon octicon-check"></span>
                  <a href="/allmarkedup/jQuery-URL-Parser/blob/master/purl.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="master" rel="nofollow" title="master">master</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item ">
                  <span class="select-menu-item-icon octicon octicon-check"></span>
                  <a href="/allmarkedup/jQuery-URL-Parser/blob/no-jquery/purl.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="no-jquery" rel="nofollow" title="no-jquery">no-jquery</a>
                </div> <!-- /.select-menu-item -->
            </div>

              <div class="select-menu-no-results">Nothing to show</div>
          </div> <!-- /.select-menu-list -->


          <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket css-truncate" data-tab-filter="tags">
            <div data-filterable-for="commitish-filter-field" data-filterable-type="substring">

                <div class="select-menu-item js-navigation-item ">
                  <span class="select-menu-item-icon octicon octicon-check"></span>
                  <a href="/allmarkedup/jQuery-URL-Parser/blob/v2.2.1/purl.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v2.2.1" rel="nofollow" title="v2.2.1">v2.2.1</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item ">
                  <span class="select-menu-item-icon octicon octicon-check"></span>
                  <a href="/allmarkedup/jQuery-URL-Parser/blob/v2.2/purl.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v2.2" rel="nofollow" title="v2.2">v2.2</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item ">
                  <span class="select-menu-item-icon octicon octicon-check"></span>
                  <a href="/allmarkedup/jQuery-URL-Parser/blob/v2.0/purl.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v2.0" rel="nofollow" title="v2.0">v2.0</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item ">
                  <span class="select-menu-item-icon octicon octicon-check"></span>
                  <a href="/allmarkedup/jQuery-URL-Parser/blob/v1.1/purl.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v1.1" rel="nofollow" title="v1.1">v1.1</a>
                </div> <!-- /.select-menu-item -->
            </div>

            <div class="select-menu-no-results">Nothing to show</div>

          </div> <!-- /.select-menu-list -->

        </div> <!-- /.select-menu-modal -->
      </div> <!-- /.select-menu-modal-holder -->
    </div> <!-- /.select-menu -->

  </div> <!-- /.scope -->

  <ul class="tabnav-tabs">
    <li><a href="/allmarkedup/jQuery-URL-Parser" class="selected js-selected-navigation-item tabnav-tab" data-selected-links="repo_source /allmarkedup/jQuery-URL-Parser">Files</a></li>
    <li><a href="/allmarkedup/jQuery-URL-Parser/commits/master" class="js-selected-navigation-item tabnav-tab" data-selected-links="repo_commits /allmarkedup/jQuery-URL-Parser/commits/master">Commits</a></li>
    <li><a href="/allmarkedup/jQuery-URL-Parser/branches" class="js-selected-navigation-item tabnav-tab" data-selected-links="repo_branches /allmarkedup/jQuery-URL-Parser/branches" rel="nofollow">Branches <span class="counter ">2</span></a></li>
  </ul>

</div>

  
  
  


            
          </div>
        </div><!-- /.repohead -->

        <div id="js-repo-pjax-container" class="container context-loader-container" data-pjax-container>
          


<!-- blob contrib key: blob_contributors:v21:81171679ea83c8e847860785fe54569c -->
<!-- blob contrib frag key: views10/v8/blob_contributors:v21:81171679ea83c8e847860785fe54569c -->


<div id="slider">
    <div class="frame-meta">

      <p title="This is a placeholder element" class="js-history-link-replace hidden"></p>

        <div class="breadcrumb">
          <span class='bold'><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/allmarkedup/jQuery-URL-Parser" class="js-slide-to" data-branch="master" data-direction="back" itemscope="url"><span itemprop="title">jQuery-URL-Parser</span></a></span></span><span class="separator"> / </span><strong class="final-path">purl.js</strong> <span class="js-zeroclipboard zeroclipboard-button" data-clipboard-text="purl.js" data-copied-hint="copied!" title="copy to clipboard"><span class="octicon octicon-clippy"></span></span>
        </div>

      <a href="/allmarkedup/jQuery-URL-Parser/find/master" class="js-slide-to" data-hotkey="t" style="display:none">Show File Finder</a>


        
  <div class="commit file-history-tease">
    <img class="main-avatar" height="24" src="https://secure.gravatar.com/avatar/5bb96a234115b3deb5ce3c626998a6f3?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
    <span class="author"><a href="/allmarkedup" rel="author">allmarkedup</a></span>
    <time class="js-relative-date" datetime="2012-08-31T01:59:11-07:00" title="2012-08-31 01:59:11">August 31, 2012</time>
    <div class="commit-title">
        <a href="/allmarkedup/jQuery-URL-Parser/commit/69a50b31c1f6185731c1fca6fe9f31d58d6947f1" class="message">Bump version number after IE patch</a>
    </div>

    <div class="participation">
      <p class="quickstat"><a href="#blob_contributors_box" rel="facebox"><strong>1</strong> contributor</a></p>
      
    </div>
    <div id="blob_contributors_box" style="display:none">
      <h2>Users on GitHub who have contributed to this file</h2>
      <ul class="facebox-user-list">
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/5bb96a234115b3deb5ce3c626998a6f3?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/allmarkedup">allmarkedup</a>
        </li>
      </ul>
    </div>
  </div>


    </div><!-- ./.frame-meta -->

    <div class="frames">
      <div class="frame" data-permalink-url="/allmarkedup/jQuery-URL-Parser/blob/0a9ed66d976d4923b68ad60fa4a439822177bafd/purl.js" data-title="jQuery-URL-Parser/purl.js at master · allmarkedup/jQuery-URL-Parser · GitHub" data-type="blob">

        <div id="files" class="bubble">
          <div class="file">
            <div class="meta">
              <div class="info">
                <span class="icon"><b class="octicon octicon-file-text"></b></span>
                <span class="mode" title="File Mode">file</span>
                  <span>272 lines (230 sloc)</span>
                <span>7.412 kb</span>
              </div>
              <div class="actions">
                <div class="button-group">
                      <a class="minibutton js-entice" href=""
                         data-entice="You must be signed in and on a branch to make or propose changes">Edit</a>
                  <a href="/allmarkedup/jQuery-URL-Parser/raw/master/purl.js" class="button minibutton " id="raw-url">Raw</a>
                    <a href="/allmarkedup/jQuery-URL-Parser/blame/master/purl.js" class="button minibutton ">Blame</a>
                  <a href="/allmarkedup/jQuery-URL-Parser/commits/master/purl.js" class="button minibutton " rel="nofollow">History</a>
                </div><!-- /.button-group -->
              </div><!-- /.actions -->

            </div>
                <div class="blob-wrapper data type-javascript js-blob-data">
      <table class="file-code file-diff">
        <tr class="file-code-line">
          <td class="blob-line-nums">
            <span id="L1" rel="#L1">1</span>
<span id="L2" rel="#L2">2</span>
<span id="L3" rel="#L3">3</span>
<span id="L4" rel="#L4">4</span>
<span id="L5" rel="#L5">5</span>
<span id="L6" rel="#L6">6</span>
<span id="L7" rel="#L7">7</span>
<span id="L8" rel="#L8">8</span>
<span id="L9" rel="#L9">9</span>
<span id="L10" rel="#L10">10</span>
<span id="L11" rel="#L11">11</span>
<span id="L12" rel="#L12">12</span>
<span id="L13" rel="#L13">13</span>
<span id="L14" rel="#L14">14</span>
<span id="L15" rel="#L15">15</span>
<span id="L16" rel="#L16">16</span>
<span id="L17" rel="#L17">17</span>
<span id="L18" rel="#L18">18</span>
<span id="L19" rel="#L19">19</span>
<span id="L20" rel="#L20">20</span>
<span id="L21" rel="#L21">21</span>
<span id="L22" rel="#L22">22</span>
<span id="L23" rel="#L23">23</span>
<span id="L24" rel="#L24">24</span>
<span id="L25" rel="#L25">25</span>
<span id="L26" rel="#L26">26</span>
<span id="L27" rel="#L27">27</span>
<span id="L28" rel="#L28">28</span>
<span id="L29" rel="#L29">29</span>
<span id="L30" rel="#L30">30</span>
<span id="L31" rel="#L31">31</span>
<span id="L32" rel="#L32">32</span>
<span id="L33" rel="#L33">33</span>
<span id="L34" rel="#L34">34</span>
<span id="L35" rel="#L35">35</span>
<span id="L36" rel="#L36">36</span>
<span id="L37" rel="#L37">37</span>
<span id="L38" rel="#L38">38</span>
<span id="L39" rel="#L39">39</span>
<span id="L40" rel="#L40">40</span>
<span id="L41" rel="#L41">41</span>
<span id="L42" rel="#L42">42</span>
<span id="L43" rel="#L43">43</span>
<span id="L44" rel="#L44">44</span>
<span id="L45" rel="#L45">45</span>
<span id="L46" rel="#L46">46</span>
<span id="L47" rel="#L47">47</span>
<span id="L48" rel="#L48">48</span>
<span id="L49" rel="#L49">49</span>
<span id="L50" rel="#L50">50</span>
<span id="L51" rel="#L51">51</span>
<span id="L52" rel="#L52">52</span>
<span id="L53" rel="#L53">53</span>
<span id="L54" rel="#L54">54</span>
<span id="L55" rel="#L55">55</span>
<span id="L56" rel="#L56">56</span>
<span id="L57" rel="#L57">57</span>
<span id="L58" rel="#L58">58</span>
<span id="L59" rel="#L59">59</span>
<span id="L60" rel="#L60">60</span>
<span id="L61" rel="#L61">61</span>
<span id="L62" rel="#L62">62</span>
<span id="L63" rel="#L63">63</span>
<span id="L64" rel="#L64">64</span>
<span id="L65" rel="#L65">65</span>
<span id="L66" rel="#L66">66</span>
<span id="L67" rel="#L67">67</span>
<span id="L68" rel="#L68">68</span>
<span id="L69" rel="#L69">69</span>
<span id="L70" rel="#L70">70</span>
<span id="L71" rel="#L71">71</span>
<span id="L72" rel="#L72">72</span>
<span id="L73" rel="#L73">73</span>
<span id="L74" rel="#L74">74</span>
<span id="L75" rel="#L75">75</span>
<span id="L76" rel="#L76">76</span>
<span id="L77" rel="#L77">77</span>
<span id="L78" rel="#L78">78</span>
<span id="L79" rel="#L79">79</span>
<span id="L80" rel="#L80">80</span>
<span id="L81" rel="#L81">81</span>
<span id="L82" rel="#L82">82</span>
<span id="L83" rel="#L83">83</span>
<span id="L84" rel="#L84">84</span>
<span id="L85" rel="#L85">85</span>
<span id="L86" rel="#L86">86</span>
<span id="L87" rel="#L87">87</span>
<span id="L88" rel="#L88">88</span>
<span id="L89" rel="#L89">89</span>
<span id="L90" rel="#L90">90</span>
<span id="L91" rel="#L91">91</span>
<span id="L92" rel="#L92">92</span>
<span id="L93" rel="#L93">93</span>
<span id="L94" rel="#L94">94</span>
<span id="L95" rel="#L95">95</span>
<span id="L96" rel="#L96">96</span>
<span id="L97" rel="#L97">97</span>
<span id="L98" rel="#L98">98</span>
<span id="L99" rel="#L99">99</span>
<span id="L100" rel="#L100">100</span>
<span id="L101" rel="#L101">101</span>
<span id="L102" rel="#L102">102</span>
<span id="L103" rel="#L103">103</span>
<span id="L104" rel="#L104">104</span>
<span id="L105" rel="#L105">105</span>
<span id="L106" rel="#L106">106</span>
<span id="L107" rel="#L107">107</span>
<span id="L108" rel="#L108">108</span>
<span id="L109" rel="#L109">109</span>
<span id="L110" rel="#L110">110</span>
<span id="L111" rel="#L111">111</span>
<span id="L112" rel="#L112">112</span>
<span id="L113" rel="#L113">113</span>
<span id="L114" rel="#L114">114</span>
<span id="L115" rel="#L115">115</span>
<span id="L116" rel="#L116">116</span>
<span id="L117" rel="#L117">117</span>
<span id="L118" rel="#L118">118</span>
<span id="L119" rel="#L119">119</span>
<span id="L120" rel="#L120">120</span>
<span id="L121" rel="#L121">121</span>
<span id="L122" rel="#L122">122</span>
<span id="L123" rel="#L123">123</span>
<span id="L124" rel="#L124">124</span>
<span id="L125" rel="#L125">125</span>
<span id="L126" rel="#L126">126</span>
<span id="L127" rel="#L127">127</span>
<span id="L128" rel="#L128">128</span>
<span id="L129" rel="#L129">129</span>
<span id="L130" rel="#L130">130</span>
<span id="L131" rel="#L131">131</span>
<span id="L132" rel="#L132">132</span>
<span id="L133" rel="#L133">133</span>
<span id="L134" rel="#L134">134</span>
<span id="L135" rel="#L135">135</span>
<span id="L136" rel="#L136">136</span>
<span id="L137" rel="#L137">137</span>
<span id="L138" rel="#L138">138</span>
<span id="L139" rel="#L139">139</span>
<span id="L140" rel="#L140">140</span>
<span id="L141" rel="#L141">141</span>
<span id="L142" rel="#L142">142</span>
<span id="L143" rel="#L143">143</span>
<span id="L144" rel="#L144">144</span>
<span id="L145" rel="#L145">145</span>
<span id="L146" rel="#L146">146</span>
<span id="L147" rel="#L147">147</span>
<span id="L148" rel="#L148">148</span>
<span id="L149" rel="#L149">149</span>
<span id="L150" rel="#L150">150</span>
<span id="L151" rel="#L151">151</span>
<span id="L152" rel="#L152">152</span>
<span id="L153" rel="#L153">153</span>
<span id="L154" rel="#L154">154</span>
<span id="L155" rel="#L155">155</span>
<span id="L156" rel="#L156">156</span>
<span id="L157" rel="#L157">157</span>
<span id="L158" rel="#L158">158</span>
<span id="L159" rel="#L159">159</span>
<span id="L160" rel="#L160">160</span>
<span id="L161" rel="#L161">161</span>
<span id="L162" rel="#L162">162</span>
<span id="L163" rel="#L163">163</span>
<span id="L164" rel="#L164">164</span>
<span id="L165" rel="#L165">165</span>
<span id="L166" rel="#L166">166</span>
<span id="L167" rel="#L167">167</span>
<span id="L168" rel="#L168">168</span>
<span id="L169" rel="#L169">169</span>
<span id="L170" rel="#L170">170</span>
<span id="L171" rel="#L171">171</span>
<span id="L172" rel="#L172">172</span>
<span id="L173" rel="#L173">173</span>
<span id="L174" rel="#L174">174</span>
<span id="L175" rel="#L175">175</span>
<span id="L176" rel="#L176">176</span>
<span id="L177" rel="#L177">177</span>
<span id="L178" rel="#L178">178</span>
<span id="L179" rel="#L179">179</span>
<span id="L180" rel="#L180">180</span>
<span id="L181" rel="#L181">181</span>
<span id="L182" rel="#L182">182</span>
<span id="L183" rel="#L183">183</span>
<span id="L184" rel="#L184">184</span>
<span id="L185" rel="#L185">185</span>
<span id="L186" rel="#L186">186</span>
<span id="L187" rel="#L187">187</span>
<span id="L188" rel="#L188">188</span>
<span id="L189" rel="#L189">189</span>
<span id="L190" rel="#L190">190</span>
<span id="L191" rel="#L191">191</span>
<span id="L192" rel="#L192">192</span>
<span id="L193" rel="#L193">193</span>
<span id="L194" rel="#L194">194</span>
<span id="L195" rel="#L195">195</span>
<span id="L196" rel="#L196">196</span>
<span id="L197" rel="#L197">197</span>
<span id="L198" rel="#L198">198</span>
<span id="L199" rel="#L199">199</span>
<span id="L200" rel="#L200">200</span>
<span id="L201" rel="#L201">201</span>
<span id="L202" rel="#L202">202</span>
<span id="L203" rel="#L203">203</span>
<span id="L204" rel="#L204">204</span>
<span id="L205" rel="#L205">205</span>
<span id="L206" rel="#L206">206</span>
<span id="L207" rel="#L207">207</span>
<span id="L208" rel="#L208">208</span>
<span id="L209" rel="#L209">209</span>
<span id="L210" rel="#L210">210</span>
<span id="L211" rel="#L211">211</span>
<span id="L212" rel="#L212">212</span>
<span id="L213" rel="#L213">213</span>
<span id="L214" rel="#L214">214</span>
<span id="L215" rel="#L215">215</span>
<span id="L216" rel="#L216">216</span>
<span id="L217" rel="#L217">217</span>
<span id="L218" rel="#L218">218</span>
<span id="L219" rel="#L219">219</span>
<span id="L220" rel="#L220">220</span>
<span id="L221" rel="#L221">221</span>
<span id="L222" rel="#L222">222</span>
<span id="L223" rel="#L223">223</span>
<span id="L224" rel="#L224">224</span>
<span id="L225" rel="#L225">225</span>
<span id="L226" rel="#L226">226</span>
<span id="L227" rel="#L227">227</span>
<span id="L228" rel="#L228">228</span>
<span id="L229" rel="#L229">229</span>
<span id="L230" rel="#L230">230</span>
<span id="L231" rel="#L231">231</span>
<span id="L232" rel="#L232">232</span>
<span id="L233" rel="#L233">233</span>
<span id="L234" rel="#L234">234</span>
<span id="L235" rel="#L235">235</span>
<span id="L236" rel="#L236">236</span>
<span id="L237" rel="#L237">237</span>
<span id="L238" rel="#L238">238</span>
<span id="L239" rel="#L239">239</span>
<span id="L240" rel="#L240">240</span>
<span id="L241" rel="#L241">241</span>
<span id="L242" rel="#L242">242</span>
<span id="L243" rel="#L243">243</span>
<span id="L244" rel="#L244">244</span>
<span id="L245" rel="#L245">245</span>
<span id="L246" rel="#L246">246</span>
<span id="L247" rel="#L247">247</span>
<span id="L248" rel="#L248">248</span>
<span id="L249" rel="#L249">249</span>
<span id="L250" rel="#L250">250</span>
<span id="L251" rel="#L251">251</span>
<span id="L252" rel="#L252">252</span>
<span id="L253" rel="#L253">253</span>
<span id="L254" rel="#L254">254</span>
<span id="L255" rel="#L255">255</span>
<span id="L256" rel="#L256">256</span>
<span id="L257" rel="#L257">257</span>
<span id="L258" rel="#L258">258</span>
<span id="L259" rel="#L259">259</span>
<span id="L260" rel="#L260">260</span>
<span id="L261" rel="#L261">261</span>
<span id="L262" rel="#L262">262</span>
<span id="L263" rel="#L263">263</span>
<span id="L264" rel="#L264">264</span>
<span id="L265" rel="#L265">265</span>
<span id="L266" rel="#L266">266</span>
<span id="L267" rel="#L267">267</span>
<span id="L268" rel="#L268">268</span>
<span id="L269" rel="#L269">269</span>
<span id="L270" rel="#L270">270</span>
<span id="L271" rel="#L271">271</span>

          </td>
          <td class="blob-line-code">
                  <div class="highlight"><pre><div class='line' id='LC1'><span class="cm">/*</span></div><div class='line' id='LC2'><span class="cm"> * JQuery URL Parser plugin, v2.2.1</span></div><div class='line' id='LC3'><span class="cm"> * Developed and maintanined by Mark Perkins, mark@allmarkedup.com</span></div><div class='line' id='LC4'><span class="cm"> * Source repository: https://github.com/allmarkedup/jQuery-URL-Parser</span></div><div class='line' id='LC5'><span class="cm"> * Licensed under an MIT-style license. See https://github.com/allmarkedup/jQuery-URL-Parser/blob/master/LICENSE for details.</span></div><div class='line' id='LC6'><span class="cm"> */</span> </div><div class='line' id='LC7'><br/></div><div class='line' id='LC8'><span class="p">;(</span><span class="kd">function</span><span class="p">(</span><span class="nx">factory</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC9'>	<span class="k">if</span> <span class="p">(</span><span class="k">typeof</span> <span class="nx">define</span> <span class="o">===</span> <span class="s1">&#39;function&#39;</span> <span class="o">&amp;&amp;</span> <span class="nx">define</span><span class="p">.</span><span class="nx">amd</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC10'>		<span class="c1">// AMD available; use anonymous module</span></div><div class='line' id='LC11'>		<span class="k">if</span> <span class="p">(</span> <span class="k">typeof</span> <span class="nx">jQuery</span> <span class="o">!==</span> <span class="s1">&#39;undefined&#39;</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC12'>			<span class="nx">define</span><span class="p">([</span><span class="s1">&#39;jquery&#39;</span><span class="p">],</span> <span class="nx">factory</span><span class="p">);</span>	</div><div class='line' id='LC13'>		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC14'>			<span class="nx">define</span><span class="p">([],</span> <span class="nx">factory</span><span class="p">);</span></div><div class='line' id='LC15'>		<span class="p">}</span></div><div class='line' id='LC16'>	<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC17'>		<span class="c1">// No AMD available; mutate global vars</span></div><div class='line' id='LC18'>		<span class="k">if</span> <span class="p">(</span> <span class="k">typeof</span> <span class="nx">jQuery</span> <span class="o">!==</span> <span class="s1">&#39;undefined&#39;</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC19'>			<span class="nx">factory</span><span class="p">(</span><span class="nx">jQuery</span><span class="p">);</span></div><div class='line' id='LC20'>		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC21'>			<span class="nx">factory</span><span class="p">();</span></div><div class='line' id='LC22'>		<span class="p">}</span></div><div class='line' id='LC23'>	<span class="p">}</span></div><div class='line' id='LC24'><span class="p">})(</span><span class="kd">function</span><span class="p">(</span><span class="nx">$</span><span class="p">,</span> <span class="kc">undefined</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC25'><br/></div><div class='line' id='LC26'>	<span class="kd">var</span> <span class="nx">tag2attr</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC27'>			<span class="nx">a</span>       <span class="o">:</span> <span class="s1">&#39;href&#39;</span><span class="p">,</span></div><div class='line' id='LC28'>			<span class="nx">img</span>     <span class="o">:</span> <span class="s1">&#39;src&#39;</span><span class="p">,</span></div><div class='line' id='LC29'>			<span class="nx">form</span>    <span class="o">:</span> <span class="s1">&#39;action&#39;</span><span class="p">,</span></div><div class='line' id='LC30'>			<span class="nx">base</span>    <span class="o">:</span> <span class="s1">&#39;href&#39;</span><span class="p">,</span></div><div class='line' id='LC31'>			<span class="nx">script</span>  <span class="o">:</span> <span class="s1">&#39;src&#39;</span><span class="p">,</span></div><div class='line' id='LC32'>			<span class="nx">iframe</span>  <span class="o">:</span> <span class="s1">&#39;src&#39;</span><span class="p">,</span></div><div class='line' id='LC33'>			<span class="nx">link</span>    <span class="o">:</span> <span class="s1">&#39;href&#39;</span></div><div class='line' id='LC34'>		<span class="p">},</span></div><div class='line' id='LC35'><br/></div><div class='line' id='LC36'>		<span class="nx">key</span> <span class="o">=</span> <span class="p">[</span><span class="s1">&#39;source&#39;</span><span class="p">,</span> <span class="s1">&#39;protocol&#39;</span><span class="p">,</span> <span class="s1">&#39;authority&#39;</span><span class="p">,</span> <span class="s1">&#39;userInfo&#39;</span><span class="p">,</span> <span class="s1">&#39;user&#39;</span><span class="p">,</span> <span class="s1">&#39;password&#39;</span><span class="p">,</span> <span class="s1">&#39;host&#39;</span><span class="p">,</span> <span class="s1">&#39;port&#39;</span><span class="p">,</span> <span class="s1">&#39;relative&#39;</span><span class="p">,</span> <span class="s1">&#39;path&#39;</span><span class="p">,</span> <span class="s1">&#39;directory&#39;</span><span class="p">,</span> <span class="s1">&#39;file&#39;</span><span class="p">,</span> <span class="s1">&#39;query&#39;</span><span class="p">,</span> <span class="s1">&#39;fragment&#39;</span><span class="p">],</span> <span class="c1">// keys available to query</span></div><div class='line' id='LC37'><br/></div><div class='line' id='LC38'>		<span class="nx">aliases</span> <span class="o">=</span> <span class="p">{</span> <span class="s1">&#39;anchor&#39;</span> <span class="o">:</span> <span class="s1">&#39;fragment&#39;</span> <span class="p">},</span> <span class="c1">// aliases for backwards compatability</span></div><div class='line' id='LC39'><br/></div><div class='line' id='LC40'>		<span class="nx">parser</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC41'>			<span class="nx">strict</span> <span class="o">:</span> <span class="sr">/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/</span><span class="p">,</span>  <span class="c1">//less intuitive, more accurate to the specs</span></div><div class='line' id='LC42'>			<span class="nx">loose</span> <span class="o">:</span>  <span class="sr">/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/</span> <span class="c1">// more intuitive, fails on relative paths and deviates from specs</span></div><div class='line' id='LC43'>		<span class="p">},</span></div><div class='line' id='LC44'><br/></div><div class='line' id='LC45'>		<span class="nx">toString</span> <span class="o">=</span> <span class="nb">Object</span><span class="p">.</span><span class="nx">prototype</span><span class="p">.</span><span class="nx">toString</span><span class="p">,</span></div><div class='line' id='LC46'><br/></div><div class='line' id='LC47'>		<span class="nx">isint</span> <span class="o">=</span> <span class="sr">/^[0-9]+$/</span><span class="p">;</span></div><div class='line' id='LC48'><br/></div><div class='line' id='LC49'>	<span class="kd">function</span> <span class="nx">parseUri</span><span class="p">(</span> <span class="nx">url</span><span class="p">,</span> <span class="nx">strictMode</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC50'>		<span class="kd">var</span> <span class="nx">str</span> <span class="o">=</span> <span class="nb">decodeURI</span><span class="p">(</span> <span class="nx">url</span> <span class="p">),</span></div><div class='line' id='LC51'>		<span class="nx">res</span>   <span class="o">=</span> <span class="nx">parser</span><span class="p">[</span> <span class="nx">strictMode</span> <span class="o">||</span> <span class="kc">false</span> <span class="o">?</span> <span class="s1">&#39;strict&#39;</span> <span class="o">:</span> <span class="s1">&#39;loose&#39;</span> <span class="p">].</span><span class="nx">exec</span><span class="p">(</span> <span class="nx">str</span> <span class="p">),</span></div><div class='line' id='LC52'>		<span class="nx">uri</span> <span class="o">=</span> <span class="p">{</span> <span class="nx">attr</span> <span class="o">:</span> <span class="p">{},</span> <span class="nx">param</span> <span class="o">:</span> <span class="p">{},</span> <span class="nx">seg</span> <span class="o">:</span> <span class="p">{}</span> <span class="p">},</span></div><div class='line' id='LC53'>		<span class="nx">i</span>   <span class="o">=</span> <span class="mi">14</span><span class="p">;</span></div><div class='line' id='LC54'><br/></div><div class='line' id='LC55'>		<span class="k">while</span> <span class="p">(</span> <span class="nx">i</span><span class="o">--</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC56'>			<span class="nx">uri</span><span class="p">.</span><span class="nx">attr</span><span class="p">[</span> <span class="nx">key</span><span class="p">[</span><span class="nx">i</span><span class="p">]</span> <span class="p">]</span> <span class="o">=</span> <span class="nx">res</span><span class="p">[</span><span class="nx">i</span><span class="p">]</span> <span class="o">||</span> <span class="s1">&#39;&#39;</span><span class="p">;</span></div><div class='line' id='LC57'>		<span class="p">}</span></div><div class='line' id='LC58'><br/></div><div class='line' id='LC59'>		<span class="c1">// build query and fragment parameters		</span></div><div class='line' id='LC60'>		<span class="nx">uri</span><span class="p">.</span><span class="nx">param</span><span class="p">[</span><span class="s1">&#39;query&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="nx">parseString</span><span class="p">(</span><span class="nx">uri</span><span class="p">.</span><span class="nx">attr</span><span class="p">[</span><span class="s1">&#39;query&#39;</span><span class="p">]);</span></div><div class='line' id='LC61'>		<span class="nx">uri</span><span class="p">.</span><span class="nx">param</span><span class="p">[</span><span class="s1">&#39;fragment&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="nx">parseString</span><span class="p">(</span><span class="nx">uri</span><span class="p">.</span><span class="nx">attr</span><span class="p">[</span><span class="s1">&#39;fragment&#39;</span><span class="p">]);</span></div><div class='line' id='LC62'><br/></div><div class='line' id='LC63'>		<span class="c1">// split path and fragement into segments		</span></div><div class='line' id='LC64'>		<span class="nx">uri</span><span class="p">.</span><span class="nx">seg</span><span class="p">[</span><span class="s1">&#39;path&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="nx">uri</span><span class="p">.</span><span class="nx">attr</span><span class="p">.</span><span class="nx">path</span><span class="p">.</span><span class="nx">replace</span><span class="p">(</span><span class="sr">/^\/+|\/+$/g</span><span class="p">,</span><span class="s1">&#39;&#39;</span><span class="p">).</span><span class="nx">split</span><span class="p">(</span><span class="s1">&#39;/&#39;</span><span class="p">);</span>     </div><div class='line' id='LC65'>		<span class="nx">uri</span><span class="p">.</span><span class="nx">seg</span><span class="p">[</span><span class="s1">&#39;fragment&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="nx">uri</span><span class="p">.</span><span class="nx">attr</span><span class="p">.</span><span class="nx">fragment</span><span class="p">.</span><span class="nx">replace</span><span class="p">(</span><span class="sr">/^\/+|\/+$/g</span><span class="p">,</span><span class="s1">&#39;&#39;</span><span class="p">).</span><span class="nx">split</span><span class="p">(</span><span class="s1">&#39;/&#39;</span><span class="p">);</span></div><div class='line' id='LC66'><br/></div><div class='line' id='LC67'>		<span class="c1">// compile a &#39;base&#39; domain attribute        </span></div><div class='line' id='LC68'>		<span class="nx">uri</span><span class="p">.</span><span class="nx">attr</span><span class="p">[</span><span class="s1">&#39;base&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="nx">uri</span><span class="p">.</span><span class="nx">attr</span><span class="p">.</span><span class="nx">host</span> <span class="o">?</span> <span class="p">(</span><span class="nx">uri</span><span class="p">.</span><span class="nx">attr</span><span class="p">.</span><span class="nx">protocol</span> <span class="o">?</span>  <span class="nx">uri</span><span class="p">.</span><span class="nx">attr</span><span class="p">.</span><span class="nx">protocol</span><span class="o">+</span><span class="s1">&#39;://&#39;</span><span class="o">+</span><span class="nx">uri</span><span class="p">.</span><span class="nx">attr</span><span class="p">.</span><span class="nx">host</span> <span class="o">:</span> <span class="nx">uri</span><span class="p">.</span><span class="nx">attr</span><span class="p">.</span><span class="nx">host</span><span class="p">)</span> <span class="o">+</span> <span class="p">(</span><span class="nx">uri</span><span class="p">.</span><span class="nx">attr</span><span class="p">.</span><span class="nx">port</span> <span class="o">?</span> <span class="s1">&#39;:&#39;</span><span class="o">+</span><span class="nx">uri</span><span class="p">.</span><span class="nx">attr</span><span class="p">.</span><span class="nx">port</span> <span class="o">:</span> <span class="s1">&#39;&#39;</span><span class="p">)</span> <span class="o">:</span> <span class="s1">&#39;&#39;</span><span class="p">;</span>      </div><div class='line' id='LC69'><br/></div><div class='line' id='LC70'>		<span class="k">return</span> <span class="nx">uri</span><span class="p">;</span></div><div class='line' id='LC71'>	<span class="p">};</span></div><div class='line' id='LC72'><br/></div><div class='line' id='LC73'>	<span class="kd">function</span> <span class="nx">getAttrName</span><span class="p">(</span> <span class="nx">elm</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC74'>		<span class="kd">var</span> <span class="nx">tn</span> <span class="o">=</span> <span class="nx">elm</span><span class="p">.</span><span class="nx">tagName</span><span class="p">;</span></div><div class='line' id='LC75'>		<span class="k">if</span> <span class="p">(</span> <span class="k">typeof</span> <span class="nx">tn</span> <span class="o">!==</span> <span class="s1">&#39;undefined&#39;</span> <span class="p">)</span> <span class="k">return</span> <span class="nx">tag2attr</span><span class="p">[</span><span class="nx">tn</span><span class="p">.</span><span class="nx">toLowerCase</span><span class="p">()];</span></div><div class='line' id='LC76'>		<span class="k">return</span> <span class="nx">tn</span><span class="p">;</span></div><div class='line' id='LC77'>	<span class="p">}</span></div><div class='line' id='LC78'><br/></div><div class='line' id='LC79'>	<span class="kd">function</span> <span class="nx">promote</span><span class="p">(</span><span class="nx">parent</span><span class="p">,</span> <span class="nx">key</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC80'>		<span class="k">if</span> <span class="p">(</span><span class="nx">parent</span><span class="p">[</span><span class="nx">key</span><span class="p">].</span><span class="nx">length</span> <span class="o">==</span> <span class="mi">0</span><span class="p">)</span> <span class="k">return</span> <span class="nx">parent</span><span class="p">[</span><span class="nx">key</span><span class="p">]</span> <span class="o">=</span> <span class="p">{};</span></div><div class='line' id='LC81'>		<span class="kd">var</span> <span class="nx">t</span> <span class="o">=</span> <span class="p">{};</span></div><div class='line' id='LC82'>		<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="k">in</span> <span class="nx">parent</span><span class="p">[</span><span class="nx">key</span><span class="p">])</span> <span class="nx">t</span><span class="p">[</span><span class="nx">i</span><span class="p">]</span> <span class="o">=</span> <span class="nx">parent</span><span class="p">[</span><span class="nx">key</span><span class="p">][</span><span class="nx">i</span><span class="p">];</span></div><div class='line' id='LC83'>		<span class="nx">parent</span><span class="p">[</span><span class="nx">key</span><span class="p">]</span> <span class="o">=</span> <span class="nx">t</span><span class="p">;</span></div><div class='line' id='LC84'>		<span class="k">return</span> <span class="nx">t</span><span class="p">;</span></div><div class='line' id='LC85'>	<span class="p">}</span></div><div class='line' id='LC86'><br/></div><div class='line' id='LC87'>	<span class="kd">function</span> <span class="nx">parse</span><span class="p">(</span><span class="nx">parts</span><span class="p">,</span> <span class="nx">parent</span><span class="p">,</span> <span class="nx">key</span><span class="p">,</span> <span class="nx">val</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC88'>		<span class="kd">var</span> <span class="nx">part</span> <span class="o">=</span> <span class="nx">parts</span><span class="p">.</span><span class="nx">shift</span><span class="p">();</span></div><div class='line' id='LC89'>		<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">part</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC90'>			<span class="k">if</span> <span class="p">(</span><span class="nx">isArray</span><span class="p">(</span><span class="nx">parent</span><span class="p">[</span><span class="nx">key</span><span class="p">]))</span> <span class="p">{</span></div><div class='line' id='LC91'>				<span class="nx">parent</span><span class="p">[</span><span class="nx">key</span><span class="p">].</span><span class="nx">push</span><span class="p">(</span><span class="nx">val</span><span class="p">);</span></div><div class='line' id='LC92'>			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="s1">&#39;object&#39;</span> <span class="o">==</span> <span class="k">typeof</span> <span class="nx">parent</span><span class="p">[</span><span class="nx">key</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC93'>				<span class="nx">parent</span><span class="p">[</span><span class="nx">key</span><span class="p">]</span> <span class="o">=</span> <span class="nx">val</span><span class="p">;</span></div><div class='line' id='LC94'>			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="s1">&#39;undefined&#39;</span> <span class="o">==</span> <span class="k">typeof</span> <span class="nx">parent</span><span class="p">[</span><span class="nx">key</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC95'>				<span class="nx">parent</span><span class="p">[</span><span class="nx">key</span><span class="p">]</span> <span class="o">=</span> <span class="nx">val</span><span class="p">;</span></div><div class='line' id='LC96'>			<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC97'>				<span class="nx">parent</span><span class="p">[</span><span class="nx">key</span><span class="p">]</span> <span class="o">=</span> <span class="p">[</span><span class="nx">parent</span><span class="p">[</span><span class="nx">key</span><span class="p">],</span> <span class="nx">val</span><span class="p">];</span></div><div class='line' id='LC98'>			<span class="p">}</span></div><div class='line' id='LC99'>		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC100'>			<span class="kd">var</span> <span class="nx">obj</span> <span class="o">=</span> <span class="nx">parent</span><span class="p">[</span><span class="nx">key</span><span class="p">]</span> <span class="o">=</span> <span class="nx">parent</span><span class="p">[</span><span class="nx">key</span><span class="p">]</span> <span class="o">||</span> <span class="p">[];</span></div><div class='line' id='LC101'>			<span class="k">if</span> <span class="p">(</span><span class="s1">&#39;]&#39;</span> <span class="o">==</span> <span class="nx">part</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC102'>				<span class="k">if</span> <span class="p">(</span><span class="nx">isArray</span><span class="p">(</span><span class="nx">obj</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC103'>					<span class="k">if</span> <span class="p">(</span><span class="s1">&#39;&#39;</span> <span class="o">!=</span> <span class="nx">val</span><span class="p">)</span> <span class="nx">obj</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">val</span><span class="p">);</span></div><div class='line' id='LC104'>				<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="s1">&#39;object&#39;</span> <span class="o">==</span> <span class="k">typeof</span> <span class="nx">obj</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC105'>					<span class="nx">obj</span><span class="p">[</span><span class="nx">keys</span><span class="p">(</span><span class="nx">obj</span><span class="p">).</span><span class="nx">length</span><span class="p">]</span> <span class="o">=</span> <span class="nx">val</span><span class="p">;</span></div><div class='line' id='LC106'>				<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC107'>					<span class="nx">obj</span> <span class="o">=</span> <span class="nx">parent</span><span class="p">[</span><span class="nx">key</span><span class="p">]</span> <span class="o">=</span> <span class="p">[</span><span class="nx">parent</span><span class="p">[</span><span class="nx">key</span><span class="p">],</span> <span class="nx">val</span><span class="p">];</span></div><div class='line' id='LC108'>				<span class="p">}</span></div><div class='line' id='LC109'>			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="o">~</span><span class="nx">part</span><span class="p">.</span><span class="nx">indexOf</span><span class="p">(</span><span class="s1">&#39;]&#39;</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC110'>				<span class="nx">part</span> <span class="o">=</span> <span class="nx">part</span><span class="p">.</span><span class="nx">substr</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="nx">part</span><span class="p">.</span><span class="nx">length</span> <span class="o">-</span> <span class="mi">1</span><span class="p">);</span></div><div class='line' id='LC111'>				<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">isint</span><span class="p">.</span><span class="nx">test</span><span class="p">(</span><span class="nx">part</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="nx">isArray</span><span class="p">(</span><span class="nx">obj</span><span class="p">))</span> <span class="nx">obj</span> <span class="o">=</span> <span class="nx">promote</span><span class="p">(</span><span class="nx">parent</span><span class="p">,</span> <span class="nx">key</span><span class="p">);</span></div><div class='line' id='LC112'>				<span class="nx">parse</span><span class="p">(</span><span class="nx">parts</span><span class="p">,</span> <span class="nx">obj</span><span class="p">,</span> <span class="nx">part</span><span class="p">,</span> <span class="nx">val</span><span class="p">);</span></div><div class='line' id='LC113'>				<span class="c1">// key</span></div><div class='line' id='LC114'>			<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC115'>				<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">isint</span><span class="p">.</span><span class="nx">test</span><span class="p">(</span><span class="nx">part</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="nx">isArray</span><span class="p">(</span><span class="nx">obj</span><span class="p">))</span> <span class="nx">obj</span> <span class="o">=</span> <span class="nx">promote</span><span class="p">(</span><span class="nx">parent</span><span class="p">,</span> <span class="nx">key</span><span class="p">);</span></div><div class='line' id='LC116'>				<span class="nx">parse</span><span class="p">(</span><span class="nx">parts</span><span class="p">,</span> <span class="nx">obj</span><span class="p">,</span> <span class="nx">part</span><span class="p">,</span> <span class="nx">val</span><span class="p">);</span></div><div class='line' id='LC117'>			<span class="p">}</span></div><div class='line' id='LC118'>		<span class="p">}</span></div><div class='line' id='LC119'>	<span class="p">}</span></div><div class='line' id='LC120'><br/></div><div class='line' id='LC121'>	<span class="kd">function</span> <span class="nx">merge</span><span class="p">(</span><span class="nx">parent</span><span class="p">,</span> <span class="nx">key</span><span class="p">,</span> <span class="nx">val</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC122'>		<span class="k">if</span> <span class="p">(</span><span class="o">~</span><span class="nx">key</span><span class="p">.</span><span class="nx">indexOf</span><span class="p">(</span><span class="s1">&#39;]&#39;</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC123'>			<span class="kd">var</span> <span class="nx">parts</span> <span class="o">=</span> <span class="nx">key</span><span class="p">.</span><span class="nx">split</span><span class="p">(</span><span class="s1">&#39;[&#39;</span><span class="p">),</span></div><div class='line' id='LC124'>			<span class="nx">len</span> <span class="o">=</span> <span class="nx">parts</span><span class="p">.</span><span class="nx">length</span><span class="p">,</span></div><div class='line' id='LC125'>			<span class="nx">last</span> <span class="o">=</span> <span class="nx">len</span> <span class="o">-</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC126'>			<span class="nx">parse</span><span class="p">(</span><span class="nx">parts</span><span class="p">,</span> <span class="nx">parent</span><span class="p">,</span> <span class="s1">&#39;base&#39;</span><span class="p">,</span> <span class="nx">val</span><span class="p">);</span></div><div class='line' id='LC127'>		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC128'>			<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">isint</span><span class="p">.</span><span class="nx">test</span><span class="p">(</span><span class="nx">key</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="nx">isArray</span><span class="p">(</span><span class="nx">parent</span><span class="p">.</span><span class="nx">base</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC129'>				<span class="kd">var</span> <span class="nx">t</span> <span class="o">=</span> <span class="p">{};</span></div><div class='line' id='LC130'>				<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">k</span> <span class="k">in</span> <span class="nx">parent</span><span class="p">.</span><span class="nx">base</span><span class="p">)</span> <span class="nx">t</span><span class="p">[</span><span class="nx">k</span><span class="p">]</span> <span class="o">=</span> <span class="nx">parent</span><span class="p">.</span><span class="nx">base</span><span class="p">[</span><span class="nx">k</span><span class="p">];</span></div><div class='line' id='LC131'>				<span class="nx">parent</span><span class="p">.</span><span class="nx">base</span> <span class="o">=</span> <span class="nx">t</span><span class="p">;</span></div><div class='line' id='LC132'>			<span class="p">}</span></div><div class='line' id='LC133'>			<span class="nx">set</span><span class="p">(</span><span class="nx">parent</span><span class="p">.</span><span class="nx">base</span><span class="p">,</span> <span class="nx">key</span><span class="p">,</span> <span class="nx">val</span><span class="p">);</span></div><div class='line' id='LC134'>		<span class="p">}</span></div><div class='line' id='LC135'>		<span class="k">return</span> <span class="nx">parent</span><span class="p">;</span></div><div class='line' id='LC136'>	<span class="p">}</span></div><div class='line' id='LC137'><br/></div><div class='line' id='LC138'>	<span class="kd">function</span> <span class="nx">parseString</span><span class="p">(</span><span class="nx">str</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC139'>		<span class="k">return</span> <span class="nx">reduce</span><span class="p">(</span><span class="nb">String</span><span class="p">(</span><span class="nx">str</span><span class="p">).</span><span class="nx">split</span><span class="p">(</span><span class="sr">/&amp;|;/</span><span class="p">),</span> <span class="kd">function</span><span class="p">(</span><span class="nx">ret</span><span class="p">,</span> <span class="nx">pair</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC140'>			<span class="k">try</span> <span class="p">{</span></div><div class='line' id='LC141'>				<span class="nx">pair</span> <span class="o">=</span> <span class="nb">decodeURIComponent</span><span class="p">(</span><span class="nx">pair</span><span class="p">.</span><span class="nx">replace</span><span class="p">(</span><span class="sr">/\+/g</span><span class="p">,</span> <span class="s1">&#39; &#39;</span><span class="p">));</span></div><div class='line' id='LC142'>			<span class="p">}</span> <span class="k">catch</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC143'>				<span class="c1">// ignore</span></div><div class='line' id='LC144'>			<span class="p">}</span></div><div class='line' id='LC145'>			<span class="kd">var</span> <span class="nx">eql</span> <span class="o">=</span> <span class="nx">pair</span><span class="p">.</span><span class="nx">indexOf</span><span class="p">(</span><span class="s1">&#39;=&#39;</span><span class="p">),</span></div><div class='line' id='LC146'>				<span class="nx">brace</span> <span class="o">=</span> <span class="nx">lastBraceInKey</span><span class="p">(</span><span class="nx">pair</span><span class="p">),</span></div><div class='line' id='LC147'>				<span class="nx">key</span> <span class="o">=</span> <span class="nx">pair</span><span class="p">.</span><span class="nx">substr</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="nx">brace</span> <span class="o">||</span> <span class="nx">eql</span><span class="p">),</span></div><div class='line' id='LC148'>				<span class="nx">val</span> <span class="o">=</span> <span class="nx">pair</span><span class="p">.</span><span class="nx">substr</span><span class="p">(</span><span class="nx">brace</span> <span class="o">||</span> <span class="nx">eql</span><span class="p">,</span> <span class="nx">pair</span><span class="p">.</span><span class="nx">length</span><span class="p">),</span></div><div class='line' id='LC149'>				<span class="nx">val</span> <span class="o">=</span> <span class="nx">val</span><span class="p">.</span><span class="nx">substr</span><span class="p">(</span><span class="nx">val</span><span class="p">.</span><span class="nx">indexOf</span><span class="p">(</span><span class="s1">&#39;=&#39;</span><span class="p">)</span> <span class="o">+</span> <span class="mi">1</span><span class="p">,</span> <span class="nx">val</span><span class="p">.</span><span class="nx">length</span><span class="p">);</span></div><div class='line' id='LC150'><br/></div><div class='line' id='LC151'>			<span class="k">if</span> <span class="p">(</span><span class="s1">&#39;&#39;</span> <span class="o">==</span> <span class="nx">key</span><span class="p">)</span> <span class="nx">key</span> <span class="o">=</span> <span class="nx">pair</span><span class="p">,</span> <span class="nx">val</span> <span class="o">=</span> <span class="s1">&#39;&#39;</span><span class="p">;</span></div><div class='line' id='LC152'><br/></div><div class='line' id='LC153'>			<span class="k">return</span> <span class="nx">merge</span><span class="p">(</span><span class="nx">ret</span><span class="p">,</span> <span class="nx">key</span><span class="p">,</span> <span class="nx">val</span><span class="p">);</span></div><div class='line' id='LC154'>		<span class="p">},</span> <span class="p">{</span> <span class="nx">base</span><span class="o">:</span> <span class="p">{}</span> <span class="p">}).</span><span class="nx">base</span><span class="p">;</span></div><div class='line' id='LC155'>	<span class="p">}</span></div><div class='line' id='LC156'><br/></div><div class='line' id='LC157'>	<span class="kd">function</span> <span class="nx">set</span><span class="p">(</span><span class="nx">obj</span><span class="p">,</span> <span class="nx">key</span><span class="p">,</span> <span class="nx">val</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC158'>		<span class="kd">var</span> <span class="nx">v</span> <span class="o">=</span> <span class="nx">obj</span><span class="p">[</span><span class="nx">key</span><span class="p">];</span></div><div class='line' id='LC159'>		<span class="k">if</span> <span class="p">(</span><span class="kc">undefined</span> <span class="o">===</span> <span class="nx">v</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC160'>			<span class="nx">obj</span><span class="p">[</span><span class="nx">key</span><span class="p">]</span> <span class="o">=</span> <span class="nx">val</span><span class="p">;</span></div><div class='line' id='LC161'>		<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">isArray</span><span class="p">(</span><span class="nx">v</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC162'>			<span class="nx">v</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">val</span><span class="p">);</span></div><div class='line' id='LC163'>		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC164'>			<span class="nx">obj</span><span class="p">[</span><span class="nx">key</span><span class="p">]</span> <span class="o">=</span> <span class="p">[</span><span class="nx">v</span><span class="p">,</span> <span class="nx">val</span><span class="p">];</span></div><div class='line' id='LC165'>		<span class="p">}</span></div><div class='line' id='LC166'>	<span class="p">}</span></div><div class='line' id='LC167'><br/></div><div class='line' id='LC168'>	<span class="kd">function</span> <span class="nx">lastBraceInKey</span><span class="p">(</span><span class="nx">str</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC169'>		<span class="kd">var</span> <span class="nx">len</span> <span class="o">=</span> <span class="nx">str</span><span class="p">.</span><span class="nx">length</span><span class="p">,</span></div><div class='line' id='LC170'>			 <span class="nx">brace</span><span class="p">,</span> <span class="nx">c</span><span class="p">;</span></div><div class='line' id='LC171'>		<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">len</span><span class="p">;</span> <span class="o">++</span><span class="nx">i</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC172'>			<span class="nx">c</span> <span class="o">=</span> <span class="nx">str</span><span class="p">[</span><span class="nx">i</span><span class="p">];</span></div><div class='line' id='LC173'>			<span class="k">if</span> <span class="p">(</span><span class="s1">&#39;]&#39;</span> <span class="o">==</span> <span class="nx">c</span><span class="p">)</span> <span class="nx">brace</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC174'>			<span class="k">if</span> <span class="p">(</span><span class="s1">&#39;[&#39;</span> <span class="o">==</span> <span class="nx">c</span><span class="p">)</span> <span class="nx">brace</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC175'>			<span class="k">if</span> <span class="p">(</span><span class="s1">&#39;=&#39;</span> <span class="o">==</span> <span class="nx">c</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">brace</span><span class="p">)</span> <span class="k">return</span> <span class="nx">i</span><span class="p">;</span></div><div class='line' id='LC176'>		<span class="p">}</span></div><div class='line' id='LC177'>	<span class="p">}</span></div><div class='line' id='LC178'><br/></div><div class='line' id='LC179'>	<span class="kd">function</span> <span class="nx">reduce</span><span class="p">(</span><span class="nx">obj</span><span class="p">,</span> <span class="nx">accumulator</span><span class="p">){</span></div><div class='line' id='LC180'>		<span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span></div><div class='line' id='LC181'>			<span class="nx">l</span> <span class="o">=</span> <span class="nx">obj</span><span class="p">.</span><span class="nx">length</span> <span class="o">&gt;&gt;</span> <span class="mi">0</span><span class="p">,</span></div><div class='line' id='LC182'>			<span class="nx">curr</span> <span class="o">=</span> <span class="nx">arguments</span><span class="p">[</span><span class="mi">2</span><span class="p">];</span></div><div class='line' id='LC183'>		<span class="k">while</span> <span class="p">(</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">l</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC184'>			<span class="k">if</span> <span class="p">(</span><span class="nx">i</span> <span class="k">in</span> <span class="nx">obj</span><span class="p">)</span> <span class="nx">curr</span> <span class="o">=</span> <span class="nx">accumulator</span><span class="p">.</span><span class="nx">call</span><span class="p">(</span><span class="kc">undefined</span><span class="p">,</span> <span class="nx">curr</span><span class="p">,</span> <span class="nx">obj</span><span class="p">[</span><span class="nx">i</span><span class="p">],</span> <span class="nx">i</span><span class="p">,</span> <span class="nx">obj</span><span class="p">);</span></div><div class='line' id='LC185'>			<span class="o">++</span><span class="nx">i</span><span class="p">;</span></div><div class='line' id='LC186'>		<span class="p">}</span></div><div class='line' id='LC187'>		<span class="k">return</span> <span class="nx">curr</span><span class="p">;</span></div><div class='line' id='LC188'>	<span class="p">}</span></div><div class='line' id='LC189'><br/></div><div class='line' id='LC190'>	<span class="kd">function</span> <span class="nx">isArray</span><span class="p">(</span><span class="nx">vArg</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC191'>		<span class="k">return</span> <span class="nb">Object</span><span class="p">.</span><span class="nx">prototype</span><span class="p">.</span><span class="nx">toString</span><span class="p">.</span><span class="nx">call</span><span class="p">(</span><span class="nx">vArg</span><span class="p">)</span> <span class="o">===</span> <span class="s2">&quot;[object Array]&quot;</span><span class="p">;</span></div><div class='line' id='LC192'>	<span class="p">}</span></div><div class='line' id='LC193'><br/></div><div class='line' id='LC194'>	<span class="kd">function</span> <span class="nx">keys</span><span class="p">(</span><span class="nx">obj</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC195'>		<span class="kd">var</span> <span class="nx">keys</span> <span class="o">=</span> <span class="p">[];</span></div><div class='line' id='LC196'>		<span class="k">for</span> <span class="p">(</span> <span class="nx">prop</span> <span class="k">in</span> <span class="nx">obj</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC197'>			<span class="k">if</span> <span class="p">(</span> <span class="nx">obj</span><span class="p">.</span><span class="nx">hasOwnProperty</span><span class="p">(</span><span class="nx">prop</span><span class="p">)</span> <span class="p">)</span> <span class="nx">keys</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">prop</span><span class="p">);</span></div><div class='line' id='LC198'>		<span class="p">}</span></div><div class='line' id='LC199'>		<span class="k">return</span> <span class="nx">keys</span><span class="p">;</span></div><div class='line' id='LC200'>	<span class="p">}</span></div><div class='line' id='LC201'><br/></div><div class='line' id='LC202'>	<span class="kd">function</span> <span class="nx">purl</span><span class="p">(</span> <span class="nx">url</span><span class="p">,</span> <span class="nx">strictMode</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC203'>		<span class="k">if</span> <span class="p">(</span> <span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span> <span class="o">===</span> <span class="mi">1</span> <span class="o">&amp;&amp;</span> <span class="nx">url</span> <span class="o">===</span> <span class="kc">true</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC204'>			<span class="nx">strictMode</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC205'>			<span class="nx">url</span> <span class="o">=</span> <span class="kc">undefined</span><span class="p">;</span></div><div class='line' id='LC206'>		<span class="p">}</span></div><div class='line' id='LC207'>		<span class="nx">strictMode</span> <span class="o">=</span> <span class="nx">strictMode</span> <span class="o">||</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC208'>		<span class="nx">url</span> <span class="o">=</span> <span class="nx">url</span> <span class="o">||</span> <span class="nb">window</span><span class="p">.</span><span class="nx">location</span><span class="p">.</span><span class="nx">toString</span><span class="p">();</span></div><div class='line' id='LC209'><br/></div><div class='line' id='LC210'>		<span class="k">return</span> <span class="p">{</span></div><div class='line' id='LC211'><br/></div><div class='line' id='LC212'>			<span class="nx">data</span> <span class="o">:</span> <span class="nx">parseUri</span><span class="p">(</span><span class="nx">url</span><span class="p">,</span> <span class="nx">strictMode</span><span class="p">),</span></div><div class='line' id='LC213'><br/></div><div class='line' id='LC214'>			<span class="c1">// get various attributes from the URI</span></div><div class='line' id='LC215'>			<span class="nx">attr</span> <span class="o">:</span> <span class="kd">function</span><span class="p">(</span> <span class="nx">attr</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC216'>				<span class="nx">attr</span> <span class="o">=</span> <span class="nx">aliases</span><span class="p">[</span><span class="nx">attr</span><span class="p">]</span> <span class="o">||</span> <span class="nx">attr</span><span class="p">;</span></div><div class='line' id='LC217'>				<span class="k">return</span> <span class="k">typeof</span> <span class="nx">attr</span> <span class="o">!==</span> <span class="s1">&#39;undefined&#39;</span> <span class="o">?</span> <span class="k">this</span><span class="p">.</span><span class="nx">data</span><span class="p">.</span><span class="nx">attr</span><span class="p">[</span><span class="nx">attr</span><span class="p">]</span> <span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">data</span><span class="p">.</span><span class="nx">attr</span><span class="p">;</span></div><div class='line' id='LC218'>			<span class="p">},</span></div><div class='line' id='LC219'><br/></div><div class='line' id='LC220'>			<span class="c1">// return query string parameters</span></div><div class='line' id='LC221'>			<span class="nx">param</span> <span class="o">:</span> <span class="kd">function</span><span class="p">(</span> <span class="nx">param</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC222'>				<span class="k">return</span> <span class="k">typeof</span> <span class="nx">param</span> <span class="o">!==</span> <span class="s1">&#39;undefined&#39;</span> <span class="o">?</span> <span class="k">this</span><span class="p">.</span><span class="nx">data</span><span class="p">.</span><span class="nx">param</span><span class="p">.</span><span class="nx">query</span><span class="p">[</span><span class="nx">param</span><span class="p">]</span> <span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">data</span><span class="p">.</span><span class="nx">param</span><span class="p">.</span><span class="nx">query</span><span class="p">;</span></div><div class='line' id='LC223'>			<span class="p">},</span></div><div class='line' id='LC224'><br/></div><div class='line' id='LC225'>			<span class="c1">// return fragment parameters</span></div><div class='line' id='LC226'>			<span class="nx">fparam</span> <span class="o">:</span> <span class="kd">function</span><span class="p">(</span> <span class="nx">param</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC227'>				<span class="k">return</span> <span class="k">typeof</span> <span class="nx">param</span> <span class="o">!==</span> <span class="s1">&#39;undefined&#39;</span> <span class="o">?</span> <span class="k">this</span><span class="p">.</span><span class="nx">data</span><span class="p">.</span><span class="nx">param</span><span class="p">.</span><span class="nx">fragment</span><span class="p">[</span><span class="nx">param</span><span class="p">]</span> <span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">data</span><span class="p">.</span><span class="nx">param</span><span class="p">.</span><span class="nx">fragment</span><span class="p">;</span></div><div class='line' id='LC228'>			<span class="p">},</span></div><div class='line' id='LC229'><br/></div><div class='line' id='LC230'>			<span class="c1">// return path segments</span></div><div class='line' id='LC231'>			<span class="nx">segment</span> <span class="o">:</span> <span class="kd">function</span><span class="p">(</span> <span class="nx">seg</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC232'>				<span class="k">if</span> <span class="p">(</span> <span class="k">typeof</span> <span class="nx">seg</span> <span class="o">===</span> <span class="s1">&#39;undefined&#39;</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC233'>					<span class="k">return</span> <span class="k">this</span><span class="p">.</span><span class="nx">data</span><span class="p">.</span><span class="nx">seg</span><span class="p">.</span><span class="nx">path</span><span class="p">;</span></div><div class='line' id='LC234'>				<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC235'>					<span class="nx">seg</span> <span class="o">=</span> <span class="nx">seg</span> <span class="o">&lt;</span> <span class="mi">0</span> <span class="o">?</span> <span class="k">this</span><span class="p">.</span><span class="nx">data</span><span class="p">.</span><span class="nx">seg</span><span class="p">.</span><span class="nx">path</span><span class="p">.</span><span class="nx">length</span> <span class="o">+</span> <span class="nx">seg</span> <span class="o">:</span> <span class="nx">seg</span> <span class="o">-</span> <span class="mi">1</span><span class="p">;</span> <span class="c1">// negative segments count from the end</span></div><div class='line' id='LC236'>					<span class="k">return</span> <span class="k">this</span><span class="p">.</span><span class="nx">data</span><span class="p">.</span><span class="nx">seg</span><span class="p">.</span><span class="nx">path</span><span class="p">[</span><span class="nx">seg</span><span class="p">];</span>                    </div><div class='line' id='LC237'>				<span class="p">}</span></div><div class='line' id='LC238'>			<span class="p">},</span></div><div class='line' id='LC239'><br/></div><div class='line' id='LC240'>			<span class="c1">// return fragment segments</span></div><div class='line' id='LC241'>			<span class="nx">fsegment</span> <span class="o">:</span> <span class="kd">function</span><span class="p">(</span> <span class="nx">seg</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC242'>				<span class="k">if</span> <span class="p">(</span> <span class="k">typeof</span> <span class="nx">seg</span> <span class="o">===</span> <span class="s1">&#39;undefined&#39;</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC243'>					<span class="k">return</span> <span class="k">this</span><span class="p">.</span><span class="nx">data</span><span class="p">.</span><span class="nx">seg</span><span class="p">.</span><span class="nx">fragment</span><span class="p">;</span>                    </div><div class='line' id='LC244'>				<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC245'>					<span class="nx">seg</span> <span class="o">=</span> <span class="nx">seg</span> <span class="o">&lt;</span> <span class="mi">0</span> <span class="o">?</span> <span class="k">this</span><span class="p">.</span><span class="nx">data</span><span class="p">.</span><span class="nx">seg</span><span class="p">.</span><span class="nx">fragment</span><span class="p">.</span><span class="nx">length</span> <span class="o">+</span> <span class="nx">seg</span> <span class="o">:</span> <span class="nx">seg</span> <span class="o">-</span> <span class="mi">1</span><span class="p">;</span> <span class="c1">// negative segments count from the end</span></div><div class='line' id='LC246'>					<span class="k">return</span> <span class="k">this</span><span class="p">.</span><span class="nx">data</span><span class="p">.</span><span class="nx">seg</span><span class="p">.</span><span class="nx">fragment</span><span class="p">[</span><span class="nx">seg</span><span class="p">];</span>                    </div><div class='line' id='LC247'>				<span class="p">}</span></div><div class='line' id='LC248'>			<span class="p">}</span></div><div class='line' id='LC249'><br/></div><div class='line' id='LC250'>		<span class="p">};</span></div><div class='line' id='LC251'><br/></div><div class='line' id='LC252'>	<span class="p">};</span></div><div class='line' id='LC253'><br/></div><div class='line' id='LC254'>	<span class="k">if</span> <span class="p">(</span> <span class="k">typeof</span> <span class="nx">$</span> <span class="o">!==</span> <span class="s1">&#39;undefined&#39;</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC255'><br/></div><div class='line' id='LC256'>		<span class="nx">$</span><span class="p">.</span><span class="nx">fn</span><span class="p">.</span><span class="nx">url</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span> <span class="nx">strictMode</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC257'>			<span class="kd">var</span> <span class="nx">url</span> <span class="o">=</span> <span class="s1">&#39;&#39;</span><span class="p">;</span></div><div class='line' id='LC258'>			<span class="k">if</span> <span class="p">(</span> <span class="k">this</span><span class="p">.</span><span class="nx">length</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC259'>				<span class="nx">url</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">attr</span><span class="p">(</span> <span class="nx">getAttrName</span><span class="p">(</span><span class="k">this</span><span class="p">[</span><span class="mi">0</span><span class="p">])</span> <span class="p">)</span> <span class="o">||</span> <span class="s1">&#39;&#39;</span><span class="p">;</span></div><div class='line' id='LC260'>			<span class="p">}</span>    </div><div class='line' id='LC261'>			<span class="k">return</span> <span class="nx">purl</span><span class="p">(</span> <span class="nx">url</span><span class="p">,</span> <span class="nx">strictMode</span> <span class="p">);</span></div><div class='line' id='LC262'>		<span class="p">};</span></div><div class='line' id='LC263'><br/></div><div class='line' id='LC264'>		<span class="nx">$</span><span class="p">.</span><span class="nx">url</span> <span class="o">=</span> <span class="nx">purl</span><span class="p">;</span></div><div class='line' id='LC265'><br/></div><div class='line' id='LC266'>	<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC267'>		<span class="nb">window</span><span class="p">.</span><span class="nx">purl</span> <span class="o">=</span> <span class="nx">purl</span><span class="p">;</span></div><div class='line' id='LC268'>	<span class="p">}</span></div><div class='line' id='LC269'><br/></div><div class='line' id='LC270'><span class="p">});</span></div><div class='line' id='LC271'><br/></div></pre></div>
          </td>
        </tr>
      </table>
  </div>

          </div>
        </div>

        <a href="#jump-to-line" rel="facebox" data-hotkey="l" class="js-jump-to-line" style="display:none">Jump to Line</a>
        <div id="jump-to-line" style="display:none">
          <h2>Jump to Line</h2>
          <form accept-charset="UTF-8" class="js-jump-to-line-form">
            <input class="textfield js-jump-to-line-field" type="text">
            <div class="full-button">
              <button type="submit" class="button">Go</button>
            </div>
          </form>
        </div>

      </div>
    </div>
</div>

<div id="js-frame-loading-template" class="frame frame-loading large-loading-area" style="display:none;">
  <img class="js-frame-loading-spinner" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-128.gif?1347543527" height="64" width="64">
</div>


        </div>
      </div>
      <div class="modal-backdrop"></div>
    </div>

      <div id="footer-push"></div><!-- hack for sticky footer -->
    </div><!-- end of wrapper - hack for sticky footer -->

      <!-- footer -->
      <div id="footer">
  <div class="container clearfix">

      <dl class="footer_nav">
        <dt>GitHub</dt>
        <dd><a href="/about">About us</a></dd>
        <dd><a href="/blog">Blog</a></dd>
        <dd><a href="/contact">Contact &amp; support</a></dd>
        <dd><a href="http://enterprise.github.com/">GitHub Enterprise</a></dd>
        <dd><a href="http://status.github.com/">Site status</a></dd>
      </dl>

      <dl class="footer_nav">
        <dt>Applications</dt>
        <dd><a href="http://mac.github.com/">GitHub for Mac</a></dd>
        <dd><a href="http://windows.github.com/">GitHub for Windows</a></dd>
        <dd><a href="http://eclipse.github.com/">GitHub for Eclipse</a></dd>
        <dd><a href="http://mobile.github.com/">GitHub mobile apps</a></dd>
      </dl>

      <dl class="footer_nav">
        <dt>Services</dt>
        <dd><a href="http://get.gaug.es/">Gauges: Web analytics</a></dd>
        <dd><a href="http://speakerdeck.com">Speaker Deck: Presentations</a></dd>
        <dd><a href="https://gist.github.com">Gist: Code snippets</a></dd>
        <dd><a href="http://jobs.github.com/">Job board</a></dd>
      </dl>

      <dl class="footer_nav">
        <dt>Documentation</dt>
        <dd><a href="http://help.github.com/">GitHub Help</a></dd>
        <dd><a href="http://developer.github.com/">Developer API</a></dd>
        <dd><a href="http://github.github.com/github-flavored-markdown/">GitHub Flavored Markdown</a></dd>
        <dd><a href="http://pages.github.com/">GitHub Pages</a></dd>
      </dl>

      <dl class="footer_nav">
        <dt>More</dt>
        <dd><a href="http://training.github.com/">Training</a></dd>
        <dd><a href="/edu">Students &amp; teachers</a></dd>
        <dd><a href="http://shop.github.com">The Shop</a></dd>
        <dd><a href="/plans">Plans &amp; pricing</a></dd>
        <dd><a href="http://octodex.github.com/">The Octodex</a></dd>
      </dl>

      <hr class="footer-divider">


    <p class="right">&copy; 2013 <span title="0.04196s from fe16.rs.github.com">GitHub</span>, Inc. All rights reserved.</p>
    <a class="left" href="/">
      <span class="mega-octicon octicon-mark-github"></span>
    </a>
    <ul id="legal">
        <li><a href="/site/terms">Terms of Service</a></li>
        <li><a href="/site/privacy">Privacy</a></li>
        <li><a href="/security">Security</a></li>
    </ul>

  </div><!-- /.container -->

</div><!-- /.#footer -->


    <div class="fullscreen-overlay js-fullscreen-overlay" id="fullscreen_overlay">
  <div class="fullscreen-container js-fullscreen-container">
    <div class="textarea-wrap">
      <textarea name="fullscreen-contents" id="fullscreen-contents" class="js-fullscreen-contents" placeholder="" data-suggester="fullscreen_suggester"></textarea>
          <div class="suggester-container">
              <div class="suggester fullscreen-suggester js-navigation-container" id="fullscreen_suggester"
                 data-url="/allmarkedup/jQuery-URL-Parser/suggestions/commit">
              </div>
          </div>
    </div>
  </div>
  <div class="fullscreen-sidebar">
    <a href="#" class="exit-fullscreen js-exit-fullscreen tooltipped leftwards" title="Exit Zen Mode">
      <span class="mega-octicon octicon-screen-normal"></span>
    </a>
    <a href="#" class="theme-switcher js-theme-switcher tooltipped leftwards"
      title="Switch themes">
      <span class="octicon octicon-color-mode"></span>
    </a>
  </div>
</div>



    <div id="ajax-error-message" class="flash flash-error">
      <span class="octicon octicon-alert"></span>
      Something went wrong with that request. Please try again.
      <a href="#" class="octicon octicon-remove-close ajax-error-dismiss"></a>
    </div>

    
    <span id='server_response_time' data-time='0.04234' data-host='fe16'></span>
    
  </body>
</html>

