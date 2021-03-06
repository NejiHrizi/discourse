module EmbedHelper

  def embed_post_date(dt)
    current = Time.now

    if dt >= 1.day.ago
      distance_of_time_in_words(dt, current)
    else
      if dt.year == current.year
        dt.strftime("%e %b")
      else
        dt.strftime("%b '%y")
      end
    end
  end

  def get_html(cooked)
    fragment = Nokogiri::HTML.fragment(cooked)
    # convert lazyYT div to link
    fragment.css('div.lazyYT').each do |yt_div|
      youtube_id = yt_div["data-youtube-id"]
      youtube_link = "https://www.youtube.com/watch?v=#{youtube_id}"
      yt_div.replace "<p><a href='#{youtube_link}'>#{youtube_link}</a></p>"
    end
    raw fragment
  end
end
